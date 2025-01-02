'use server';

import {
	removeFileSchema,
	uploadFileSchema,
} from '@/app/admin/post/_lib/post.schema';
import { authActionClient } from '@/lib/safe-action';
import { removeFile } from '@/use-cases/remove-file';
import { uploadFile } from '@/use-cases/upload-file';
import { randomUUID } from 'crypto';

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
		const id = randomUUID();
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
