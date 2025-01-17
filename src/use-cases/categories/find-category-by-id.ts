import { CategoryRow } from '@/app/admin/(dashboard)/categories/_types/categories';
import { findCategoryById } from '@/data-acces/categories';
import { CustomError } from '@/helpers/custom-error';
import { formatDate } from '@/lib/format-dates';

export const findCategoryByIdUseCase = async (
	id: string
): Promise<CategoryRow> => {
	const category = await findCategoryById(id);

	if (!category) {
		throw new CustomError('Category not found');
	}

	return {
		createdAt: formatDate(category.createdAt).format('LLL'),
		id: category?.id || '',
		name: category?.name,
		updatedAt: formatDate(category.updatedAt).format('LLL'),
	};
};
