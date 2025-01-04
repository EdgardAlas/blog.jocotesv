'use server';

import {
	removeFileSchema,
	SavePostSchema,
	uploadFileSchema,
} from '@/app/admin/post/_lib/post.schema';
import { authActionClient } from '@/lib/safe-action';
import { insertMediaUseCase } from '@/use-cases/media.use-case';
import {
	insertPostUseCase,
	updatePostUseCase,
} from '@/use-cases/post.use-case';
import { removeFile } from '@/use-cases/remove-file.use-case';
import { uploadFile } from '@/use-cases/upload-file';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const POST_IMAGE_FOLDER = 'post-seo-images';
const POST_CONTENT_IMAGE_FOLDER = 'post-content-images';

export const uploadPostSeoImageAction = authActionClient
	.schema(uploadFileSchema)
	.action(async ({ parsedInput: { file } }) => {
		const url = await uploadFile(file, POST_IMAGE_FOLDER);
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
		const url = await uploadFile(file, POST_CONTENT_IMAGE_FOLDER);
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
		redirect('/admin/posts');
	});
