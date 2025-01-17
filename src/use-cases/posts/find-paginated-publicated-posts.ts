import { PublicPostCardType } from '@/app/[locale]/(public)/_types/public-post-card';
import {
	countPublicatedPosts,
	findPaginatedPublicatedPosts,
} from '@/data-acces/posts';
import { calculateTotalPages } from '@/helpers/calculate-total-pages';
import { postCardMapper } from '@/use-cases/posts/post-card-mapper';

export const findPaginatedPublicatedPostsUseCase = async (
	page: number,
	limit: number,
	search: string,
	locale: string
): Promise<WithPagination<PublicPostCardType>> => {
	const [posts, total] = await Promise.all([
		findPaginatedPublicatedPosts(page, limit, search, locale),
		countPublicatedPosts(search),
	]);

	const mappedPosts: PublicPostCardType[] = posts.map(postCardMapper);

	return {
		data: mappedPosts,
		totalPages: calculateTotalPages(total, limit),
	};
};
