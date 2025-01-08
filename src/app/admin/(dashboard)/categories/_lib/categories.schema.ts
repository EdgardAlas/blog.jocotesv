import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

export const SaveCategorySchema = z.object({
	id: z.string(),
	name: z.string().nonempty("Category name can't be empty"),
});

export const GetCategoryByIdSchema = z.string().nonempty('Id is required');

export const SearchCategoriesByNameSchema = z
	.string()
	.nonempty("Category name can't be empty");

export const SaveCategoryResolver = zodResolver(SaveCategorySchema);
