import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

export const SaveAuthorSchema = z.object({
	name: z.string().nonempty('Name is required'),
	id: z.string(),
});

export const GetAuthorByIdSchema = z.string().nonempty('Id is required');
export const SearchAuthorsByNameSchema = z
	.string()
	.nonempty('Name is required');

export const SaveAuthorResolver = zodResolver(SaveAuthorSchema);
