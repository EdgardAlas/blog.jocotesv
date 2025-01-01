import { z } from 'zod';
import { zfd } from 'zod-form-data';
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const uploadFileSchema = zfd.formData({
	file: zfd.file().refine(({ size }) => size <= MAX_FILE_SIZE, {
		message: `File size must be less than ${MAX_FILE_SIZE / 1024 / 1024} MB`,
		path: ['file'],
	}),
});

export const removeFileSchema = z.object({
	url: z.string().url('Invalid URL'),
});
