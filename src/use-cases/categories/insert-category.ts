import { SaveCategorySchema } from '@/app/admin/(dashboard)/categories/_lib/categories.schema';
import { findCategoryByName, insertCategory } from '@/data-acces/categories';
import { CustomError } from '@/helpers/custom-error';
import { z } from 'zod';

export const insertCategoryUseCase = async (
	category: Omit<z.infer<typeof SaveCategorySchema>, 'id'>
) => {
	const findCategory = await findCategoryByName(category.name);

	if (findCategory) {
		throw new CustomError('Category already exists');
	}

	return insertCategory({
		name: category.name,
	});
};
