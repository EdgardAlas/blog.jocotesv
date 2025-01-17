import { CategoryRow } from '@/app/admin/(dashboard)/categories/_types/categories';
import {
	getPaginatedCategories,
	countCategories,
} from '@/data-acces/categories';
import { calculateTotalPages } from '@/helpers/calculate-total-pages';
import { formatDate } from '@/lib/format-dates';

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
		totalPages: calculateTotalPages(count, pageSize),
	};
};
