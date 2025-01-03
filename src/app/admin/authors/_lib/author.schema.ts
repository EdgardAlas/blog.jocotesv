import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

export const SaveAuthorSchema = z
	.object({
		name: z.string().nonempty('Name is required'),
		id: z.string(),
	})
	.refine(
		(data) => {
			// if id is empty the id is not required
			if (!data.id) {
				return true;
			}

			return data.id;
		},
		{
			params: ['id'],
			message: 'Id is required',
		}
	);

export const GetAuthorByIdSchema = z.object({
	id: z.string().nonempty('Id is required'),
});

export const SaveAuthorResolver = zodResolver(SaveAuthorSchema);
