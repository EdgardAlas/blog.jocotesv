import { z } from 'zod';

export const GetPostByIdSchema = z.string().nonempty('Invalid post id');
