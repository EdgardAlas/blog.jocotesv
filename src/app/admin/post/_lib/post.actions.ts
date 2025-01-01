'use server';

import {
	removeFileSchema,
	uploadFileSchema,
} from '@/app/admin/post/_lib/post.schema';
import { authActionClient } from '@/lib/safe-action';
import { removeFile } from '@/use-cases/remove-file';
import { uploadFile } from '@/use-cases/upload-file';

const POST_IMAGE_FOLDER = 'post-seo-images';

export const uploadPostImageAction = authActionClient
	.schema(uploadFileSchema)
	.action(async ({ parsedInput: { file } }) => {
		const url = await uploadFile(file, POST_IMAGE_FOLDER);
		return url;
	});

export const removePostImageAction = authActionClient
	.schema(removeFileSchema)
	.action(async ({ parsedInput: { url } }) => {
		await removeFile(url, POST_IMAGE_FOLDER);
	});
