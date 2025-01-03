import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

export const SaveCategorySchema = z
	.object({
		id: z.string(),
		name: z.string().nonempty("Category name can't be empty"),
	})
	.refine(
		(data) => {
			if (!data.id) {
				return true;
			}

			return data.id;
		},
		{ params: ['id'], message: 'Id is required' }
	);

export const GetCategoryByIdSchema = z.object({
	id: z.string().nonempty('Id is required'),
});

export const SaveCategoryResolver = zodResolver(SaveCategorySchema);
