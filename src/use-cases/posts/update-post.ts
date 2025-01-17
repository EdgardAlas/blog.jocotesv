import { SavePostSchema } from '@/app/admin/(dashboard)/post/_lib/post.schema';
import { POST_IMAGE_FOLDER } from '@/config/cloudinary';
import {
	deletePostCategories,
	insertPostCategories,
} from '@/data-acces/post-categories';
import { deletePostMedia, insertPostMediaArray } from '@/data-acces/post-media';
import { updatePost } from '@/data-acces/posts';
import { db } from '@/lib/db';
import { extractPublicIdFromUrl } from '@/use-cases/cloudinary/extract-public-id.use-case';
import { z } from 'zod';
import { insertMediaUseCase } from '../media/insert-media';
import { extractImagesIdFromContent } from '@/use-cases/posts/extract-images-from-content';

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
