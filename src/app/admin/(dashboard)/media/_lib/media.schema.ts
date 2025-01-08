import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

export const GetImageById = z.string().nonempty('Image id is required');

const MAX_FILE_SIZE = 5000000;

export const UploadMediaSchema = z.object({
	folder: z.string().nonempty('Please select a folder'),
	image: z
		.instanceof(File, {
			message: 'Please select a file',
		})
		.refine((file) => file.size < MAX_FILE_SIZE, {
			message: 'The file is too large',
			path: ['image'],
		}),
});

export const UploadMediaSchemaResolver = zodResolver(UploadMediaSchema);
