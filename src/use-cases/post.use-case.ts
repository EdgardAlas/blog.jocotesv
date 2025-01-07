import { SavePostSchema } from '@/app/admin/post/_lib/post.schema';
import { JSDOM } from 'jsdom';
import { nanoid } from 'nanoid';

import {
	deletePostCategories,
	insertPostCategories,
} from '@/data-acces/post-categories.data-access';
import {
	deletePostMedia,
	insertPostMediaArray,
} from '@/data-acces/post-media.data-acces';
import {
	deletePost,
	existsSlug,
	findPostBySlug,
	insertPost,
	updatePost,
} from '@/data-acces/posts-data-acces';
import { CustomError } from '@/helpers/custom-error';
import { db } from '@/lib/db';
import { formatDate } from '@/lib/format-dates';
import slugify from 'slugify';
import { z } from 'zod';

export const insertPostUseCase = async (
	post: z.infer<typeof SavePostSchema>
) => {
	const findPost = await findPostBySlug(post.slug);

	if (findPost) {
		throw new CustomError('Post slug already exists');
	}

	await db.transaction(async (tx) => {
		const postId = await insertPost(
			{
				content: post.content,
				authorId: post.author.value,
				slug: post.slug,
				title: post.title,
				featured: post.featured,
				image: post.image,
				status: post.status,
				publicationDate: post.publicationDate.toISOString(),
				description: post.description,
			},
			tx
		);

		if (post.categories && post.categories.length) {
			await insertPostCategories(
				post.categories.map((c) => c.value),
				postId,
				tx
			);
		}

		const imagesId = extractImagesIdFromContent(post.content);
		if (imagesId.length) {
			await insertPostMediaArray(imagesId, postId, tx);
		}
	});
};

export const updatePostUseCase = async (
	postId: string,
	post: z.infer<typeof SavePostSchema>
) => {
	await db.transaction(async (tx) => {
		await Promise.all([
			await deletePostCategories(postId, tx),
			await deletePostMedia(postId, tx),
		]);

		const id = await updatePost(
			postId,
			{
				content: post.content,
				authorId: post.author.value,
				slug: post.slug,
				title: post.title,
				featured: post.featured,
				image: post.image,
				status: post.status,
				publicationDate: post.publicationDate.toISOString(),
				description: post.description,
			},
			tx
		);

		if (post.categories && post.categories.length) {
			await insertPostCategories(
				post.categories.map((c) => c.value),
				id,
				tx
			);
		}

		const imagesId = extractImagesIdFromContent(post.content);

		if (imagesId.length) {
			await insertPostMediaArray(imagesId, id, tx);
		}
	});
};

export const extractImagesIdFromContent = (content: string) => {
	const dom = new JSDOM(content);
	const images = dom.window.document.querySelectorAll('img');

	return [
		...new Set(
			Array.from(images)
				.map((img) => img.dataset.id ?? '')
				.filter(Boolean)
		),
	];
};

export const deletePostUseCase = (postId: string) => {
	return db.transaction(async (tx) => {
		await Promise.all([
			await deletePostCategories(postId, tx),
			await deletePostMedia(postId, tx),
		]);
		await deletePost(postId, tx);
	});
};

export const isSlugAvailableUseCase = async (slug: string, id: string = '') => {
	const postFound = await existsSlug(slug);

	if (!postFound) {
		return true;
	}

	return postFound.id === id;
};

export const generateSlugUseCase = async (slug: string) => {
	const newSlug = `${slug}-${nanoid(4)}`;
	return slugify(newSlug, { lower: true });
};

export const getInitialValuesUseCase = async (
	id: string = ''
): Promise<z.infer<typeof SavePostSchema> | null> => {
	if (!id) {
		return {
			id: '',
			title: '',
			slug: '',
			description: '',
			content: '',
			author: { label: '', value: '' },
			categories: [],
			featured: false,
			image: '',
			status: 'draft',
			publicationDate: new Date(),
		};
	}

	const post = await findPostBySlug(id);

	if (!post) {
		return null;
	}

	return {
		id: post.id,
		title: post.title,
		slug: post.slug,
		description: post.description ?? '',
		content: post.content,
		author: { label: post.author?.name ?? '', value: post.author?.id ?? '' },
		categories: post.postCategories.map((c) => ({
			label: c.category.name,
			value: c.category.id,
		})),
		featured: post.featured ?? false,
		image: post.image ?? '',
		status: post.status,
		publicationDate: formatDate(post.publicationDate).toDate(),
	};
};
