import { SavePostSchema } from '@/app/admin/post/_lib/post.schema';
import {
	deletePostCategories,
	insertPostCategories,
} from '@/data-acces/post-categories.data-access';
import {
	findPostBySlug,
	insertPost,
	updatePost,
} from '@/data-acces/posts-data-acces';
import { db } from '@/lib/db';
import { z } from 'zod';

export const insertPostUseCase = async (
	post: z.infer<typeof SavePostSchema>
) => {
	const findPost = await findPostBySlug(post.slug);

	if (findPost) {
		throw new Error('Post already exists');
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
	});

	// TODO: extract images from content and save them in the media table
};

export const updatePostUseCase = async (
	postId: string,
	post: z.infer<typeof SavePostSchema>
) => {
	await db.transaction(async (tx) => {
		await deletePostCategories(postId, tx);

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
	});

	// TODO: extract images from content and save them in the media table
};
