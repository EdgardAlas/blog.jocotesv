import { zodResolver } from '@hookform/resolvers/zod';
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

export const SavePostSchema = z.object({
	id: z.string(),
	title: z.string().nonempty("The title can't be empty"),
	content: z.string().nonempty("The content can't be empty"),
	featured: z.boolean().default(false),
	image: z.string(),
	description: z.string().nonempty("The description can't be empty"),
	slug: z.string().nonempty("The slug can't be empty"),
	status: z.string(),
	author: z
		.object({
			value: z.string(),
			label: z.string(),
		})
		.refine((data) => data.value !== '', {
			message: "The author can't be empty",
		}),
	publicationDate: z.date(),
	categories: z.array(
		z.object({
			value: z.string(),
			label: z.string(),
		})
	),
	lang: z.enum(['en', 'es'], {
		message: 'Invalid language',
	}),
	parentId: z.string().nullable(),
	previousSlug: z.string(),
	editPostUrl: z.string(),
});

export const GenerateSlugSchema = z.object({
	title: z.string().nonempty("Title can't be empty"),
	id: z.string(),
});

export const GetPostByIdSchema = z.string().nonempty('Invalid post id');

export const PostFormSchemaResolver = zodResolver(SavePostSchema);
