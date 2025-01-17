import { existsSlug } from '@/data-acces/posts';

export const isSlugAvailableUseCase = async (slug: string, id: string = '') => {
	const postFound = await existsSlug(slug);

	if (!postFound) {
		return true;
	}

	return postFound.id === id;
};
