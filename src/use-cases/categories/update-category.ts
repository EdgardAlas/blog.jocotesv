import { SaveCategorySchema } from '@/app/admin/(dashboard)/categories/_lib/categories.schema';
import { findCategoryByName, updateCategory } from '@/data-acces/categories';
import { CustomError } from '@/helpers/custom-error';
import { z } from 'zod';

export const updateCategoryUseCase = async (
	id: string,
	data: z.infer<typeof SaveCategorySchema>
) => {
	const category = await findCategoryByName(data.name);

	if (category && category.id !== id) {
		throw new CustomError('Category already exists');
	}

	await updateCategory(id, {
		name: data.name,
	});
};
