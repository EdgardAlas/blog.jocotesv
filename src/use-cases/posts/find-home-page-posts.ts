import { PublicPostCardType } from '@/app/[locale]/(public)/_types/public-post-card';
import { findFeaturedPosts, findRecentPosts } from '@/data-acces/posts';
import { postCardMapper } from '@/use-cases/posts/post-card-mapper';

export const findHomePagePostsUseCase = async (
	locale: string
): Promise<{
	featuredPosts: PublicPostCardType[];
	recentPosts: PublicPostCardType[];
}> => {
	const [featuredPosts, recentPosts] = await Promise.all([
		findFeaturedPosts(4, locale),
		findRecentPosts(8, locale),
	]);

	const mappedFeaturedPosts: PublicPostCardType[] =
		featuredPosts.map(postCardMapper);

	const mappedRecentPosts: PublicPostCardType[] =
		recentPosts.map(postCardMapper);

	return {
		featuredPosts: mappedFeaturedPosts,
		recentPosts: mappedRecentPosts,
	};
};
