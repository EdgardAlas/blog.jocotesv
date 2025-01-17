import { findCategoriesByName } from '@/data-acces/categories';

export const findCategoriesByNameUseCase = async (name: string) => {
	const categories = await findCategoriesByName(name);

	return categories.map((category) => ({
		label: category.name,
		value: category.id,
	}));
};
