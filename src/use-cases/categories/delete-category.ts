import { findCategoryById, deleteCategory } from '@/data-acces/categories';
import { CustomError } from '@/helpers/custom-error';

export const deleteCategoryUseCase = async (id: string) => {
	const category = await findCategoryById(id);

	if (!category) {
		throw new CustomError('Category not found');
	}

	await deleteCategory(id);
};
