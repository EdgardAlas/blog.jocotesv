import { SavePostSchema } from '@/app/admin/(dashboard)/post/_lib/post.schema';
import { POST_IMAGE_FOLDER } from '@/config/cloudinary';
import { insertPostCategories } from '@/data-acces/post-categories';
import { insertPostMediaArray } from '@/data-acces/post-media';
import { findPostBySlug, insertPost } from '@/data-acces/posts';
import { CustomError } from '@/helpers/custom-error';
import { db } from '@/lib/db';
import { extractPublicIdFromUrl } from '@/use-cases/cloudinary/extract-public-id.use-case';
import { z } from 'zod';
import { insertMediaUseCase } from '../media/insert-media';
import { extractImagesIdFromContent } from '@/use-cases/posts/extract-images-from-content';

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
