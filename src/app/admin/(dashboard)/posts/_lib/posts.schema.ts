import { z } from 'zod';

export const GetPostByIdSchema = z.string().nonempty('Invalid post id');

export const GetPostSchema = z.object({
	id: GetPostByIdSchema,
	slug: z.string().nonempty('Invalid post slug'),
});
