import 'server-only';

import { SavePostSchema } from '@/app/admin/(dashboard)/post/_lib/post.schema';
import { Post } from '@/app/admin/(dashboard)/post/_types/posts';
import { POST_IMAGE_FOLDER } from '@/config/cloudinary';
import {
	deletePostCategories,
	insertPostCategories,
} from '@/data-acces/post-categories.data-access';
import {
	deletePostMedia,
	insertPostMediaArray,
} from '@/data-acces/post-media.data-acces';
import {
	addPostView,
	countPosts,
	deletePost,
	existsSlug,
	findLangPostBySlug,
	findAdminPaginatedPosts,
	findPostBySlug,
	insertPost,
	updatePost,
} from '@/data-acces/posts.data-acces';
import { calculateTotalPages } from '@/helpers/calculate-total-pages';
import { CustomError } from '@/helpers/custom-error';
import { db } from '@/lib/db';
import { formatDate } from '@/lib/format-dates';
import { extractPublicIdFromUrl } from '@/use-cases/extract-public-id.use-case';
import { insertMediaUseCase } from './media/insert-media';
import { JSDOM } from 'jsdom';
import { nanoid } from 'nanoid';
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
				parentId: post.parentId,
				lang: post.lang,
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
		const publicId = extractPublicIdFromUrl(post.image, POST_IMAGE_FOLDER);
		const insertSeoImage = await insertMediaUseCase(post.image, publicId ?? '');

		const imagesId = extractImagesIdFromContent(post.content, insertSeoImage);

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
				parentId: post.parentId,
				lang: post.lang,
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

		const publicId = extractPublicIdFromUrl(post.image, POST_IMAGE_FOLDER);
		const insertSeoImage = await insertMediaUseCase(post.image, publicId ?? '');

		const imagesId = extractImagesIdFromContent(post.content, insertSeoImage);

		if (imagesId.length) {
			await insertPostMediaArray(imagesId, id, tx);
		}
	});
};

export const extractImagesIdFromContent = (
	content: string,
	...extraImages: string[]
) => {
	const dom = new JSDOM(content);
	const images = dom.window.document.querySelectorAll('img');

	return [
		...new Set(Array.from(images).map((img) => img.dataset.id ?? '')),
		...extraImages,
	].filter(Boolean);
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
	slug: string = '',
	lang: string = 'en'
): Promise<z.infer<typeof SavePostSchema> | null> => {
	if (!slug) {
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
			lang: 'en',
			parentId: null,
			previousSlug: '',
		};
	}

	if (lang && lang !== 'en') {
		const data = await findLangPostBySlug(slug, lang);

		if (!data) {
			return null;
		}

		const { post, langPost } = data;

		return {
			id: langPost?.id || '',
			title: langPost?.title || post.title,
			slug:
				langPost?.slug ||
				slugify(`${post.slug}-${lang}-${nanoid(4)}`, { lower: true }),
			description: langPost?.description || post.description || '',
			content: langPost?.content || post.content || '',
			author: {
				label: langPost?.author?.name || post.author?.name || '',
				value: langPost?.author?.id || post.author?.id || '',
			},
			categories:
				langPost?.postCategories.map((c) => ({
					label: c.category.name,
					value: c.category.id,
				})) || [],
			featured: langPost?.featured || langPost?.featured || false,
			image: langPost?.image || post.image || '',
			status: langPost?.status || post.status || 'draft',
			publicationDate: formatDate(
				langPost?.publicationDate || post.publicationDate
			).toDate(),
			parentId: langPost?.parentId || post.id,
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			lang: (langPost?.lang as any) ?? lang,
			previousSlug: langPost?.slug || post.slug,
		} satisfies z.infer<typeof SavePostSchema>;
	}

	const post = await findPostBySlug(slug);

	if (!post) {
		return null;
	}

	if (post.parentId) {
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
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		lang: (post.lang as any) ?? 'en',
		parentId: post.parentId,
		previousSlug: post.slug,
	} satisfies z.infer<typeof SavePostSchema>;
};

export const findAdminPaginationPostsUseCase = async (
	page: number,
	limit: number,
	filters: { search: string; status: string }
): Promise<WithPagination<Post>> => {
	const [posts, total] = await Promise.all([
		findAdminPaginatedPosts(page, limit, filters),
		countPosts(filters),
	]);

	const mappedPosts: Post[] = posts.map(postMapper);
	return {
		data: mappedPosts,
		totalPages: calculateTotalPages(total, limit),
	};
};

const postMapper = (
	post: Awaited<ReturnType<typeof findAdminPaginatedPosts>>[0]
): Post => ({
	id: post.id,
	title: post.title,
	slug: post.slug ?? '',
	image: post.image ?? '',
	categories: post.postCategories.map((c) => c.category.name),
	author: post?.author?.name ?? '',
	status: post.status,
	publicationDate: formatDate(post.publicationDate).format('MMMM DD, YYYY'),
	description: post.shortDescription ?? '',
	featured: post.featured ?? false,
	updatedAt: formatDate(post.updatedAt).format('LLLL'),
});

export const addPostViewUseCase = async (slug: string) => {
	const post = await findPostBySlug(slug);

	if (post) {
		return addPostView(slug);
	}

	return null;
};
