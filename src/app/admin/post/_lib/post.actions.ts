'use server';

import { removeFile, uploadFile } from '@/lib/cloudinary';
import { authActionClient } from '@/lib/safe-action';
import { z } from 'zod';
import { zfd } from 'zod-form-data';

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const uploadPostImageAction = authActionClient
	.schema(
		z
			.object({
				file: zfd.file(),
			})
			.refine(async ({ file }) => file.size <= MAX_FILE_SIZE, {
				message: `File size must be less than ${MAX_FILE_SIZE / 1024 / 1024} MB`,
				path: ['file'],
			})
	)
	.action(async ({ parsedInput: { file } }) => {
		const url = await uploadFile(file, 'post-seo-images');
		return url;
	});

export const removePostImageAction = authActionClient
	.schema(
		z.object({
			url: z.string().url('Invalid URL'),
		})
	)
	.action(async ({ parsedInput: { url } }) => {
		await removeFile(url, 'post-seo-images');
	});
