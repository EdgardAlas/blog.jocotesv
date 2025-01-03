import { SaveCategorySchema } from '@/app/admin/categories/_lib/categories.schema';
import {
	countCategories,
	deleteCategory,
	getCategoryById,
	getPaginatedCategories,
	insertCategory,
	updateCategory,
} from '@/data-acces/categories.data-acces';
import { CustomError } from '@/helpers/custom-error';
import { formatDate } from '@/lib/format-dates';
import { CategoryRow } from '@/types/categories';
import { z } from 'zod';

export const insertCategoryUseCase = (
	category: Omit<z.infer<typeof SaveCategorySchema>, 'id'>
) => {
	return insertCategory({
		name: category.name,
	});
};

export const getCategoryByIdUseCase = async (
	id: string
): Promise<CategoryRow> => {
	const category = await getCategoryById(id);

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

export const updateCategoryUseCase = async (
	id: string,
	data: z.infer<typeof SaveCategorySchema>
) => {
	const category = await getCategoryById(id);

	if (!category) {
		throw new CustomError('Category not found');
	}

	await updateCategory(id, {
		name: data.name,
	});
};

export const getPaginatedCategoriesUseCase = async (
	page: number,
	pageSize: number,
	search: string
): Promise<WithPagination<CategoryRow>> => {
	const [categories, count] = await Promise.all([
		getPaginatedCategories(page, pageSize, search),
		countCategories(search),
	]);

	const mappedCategories: CategoryRow[] = categories.map((category) => ({
		createdAt: formatDate(category.createdAt).format('LLL'),
		id: category?.id || '',
		name: category?.name,
		updatedAt: formatDate(category.updatedAt).format('LLL'),
	}));

	return {
		data: mappedCategories,
		totalPages: Math.ceil(count / pageSize),
	};
};

export const deleteCategoryUseCase = async (id: string) => {
	const category = await getCategoryById(id);

	if (!category) {
		throw new CustomError('Category not found');
	}

	await deleteCategory(id);
};
