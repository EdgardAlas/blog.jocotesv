'use server';

import {
	GenerateSlugSchema,
	GetPostByIdSchema,
	removeFileSchema,
	SavePostSchema,
	uploadFileSchema,
} from '@/app/admin/post/_lib/post.schema';
import { authActionClient } from '@/lib/safe-action';
import { insertMediaUseCase } from '@/use-cases/media.use-case';
import {
	deletePostUseCase,
	generateSlugUseCase,
	insertPostUseCase,
	isSlugAvailableUseCase,
	updatePostUseCase,
} from '@/use-cases/post.use-case';
import { removeFile } from '@/use-cases/remove-file.use-case';
import { uploadToCloudinaryUseCase } from '@/use-cases/cloudinary.use-case';
import { revalidatePath } from 'next/cache';
import slugify from 'slugify';

const POST_IMAGE_FOLDER = 'post-seo-images';
const POST_CONTENT_IMAGE_FOLDER = 'post-content-images';

export const uploadPostSeoImageAction = authActionClient
	.schema(uploadFileSchema)
	.action(async ({ parsedInput: { file } }) => {
		const url = await uploadToCloudinaryUseCase(file, POST_IMAGE_FOLDER);
		return url;
	});

export const removePostSeoImageAction = authActionClient
	.schema(removeFileSchema)
	.action(async ({ parsedInput: { url } }) => {
		await removeFile(url, POST_IMAGE_FOLDER);
	});

export const uploadPostContentImageAction = authActionClient
	.schema(uploadFileSchema)
	.action(async ({ parsedInput: { file } }) => {
		const url = await uploadToCloudinaryUseCase(
			file,
			POST_CONTENT_IMAGE_FOLDER
		);
		let id = '';

		if (url) {
			id = await insertMediaUseCase(url);
		}

		return {
			id,
			url,
		};
	});

export const removePostContentImageAction = authActionClient
	.schema(removeFileSchema)
	.action(async ({ parsedInput: { url } }) => {
		await removeFile(url, POST_CONTENT_IMAGE_FOLDER);
	});

export const savePostAction = authActionClient
	.schema(SavePostSchema)
	.action(async ({ parsedInput }) => {
		if (parsedInput.id) {
			await updatePostUseCase(parsedInput.id, parsedInput);
		} else {
			await insertPostUseCase(parsedInput);
		}
		revalidatePath('/admin/posts');
	});

export const deletePostAction = authActionClient
	.schema(GetPostByIdSchema)
	.action(async ({ parsedInput }) => {
		await deletePostUseCase(parsedInput);
		revalidatePath('/admin/posts');
	});

export const generateSlugAction = authActionClient

	.schema(GenerateSlugSchema)
	.action(async ({ parsedInput: { title, id } }) => {
		const slug = slugify(title, { lower: true });

		const isValidSlug = await isSlugAvailableUseCase(slug, id);

		if (isValidSlug) {
			return slug;
		}

		return generateSlugUseCase(slug);
	});
