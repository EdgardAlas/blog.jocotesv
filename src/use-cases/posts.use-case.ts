import { Post } from '@/app/[locale]/(public)/[slug]/_types/post';
import { PublicPostCardType } from '@/app/[locale]/(public)/_types/public-post-card';
import {
	countPublicatedPosts,
	findFeaturedPosts,
	findPaginatedPublicatedPosts,
	findPublishedPostBySlug,
	findRecentPosts,
} from '@/data-acces/posts.data-acces';
import { calculateTotalPages } from '@/helpers/calculate-total-pages';
import { cache } from 'react';

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

	const mappedFeaturedPosts: PublicPostCardType[] = featuredPosts.map((post) =>
		postCardMapper(post)
	);

	const mappedRecentPosts: PublicPostCardType[] = recentPosts.map((post) =>
		postCardMapper(post)
	);

	return {
		featuredPosts: mappedFeaturedPosts,
		recentPosts: mappedRecentPosts,
	};
};

export const findPublishedPostUseCase = cache(
	async (slug: string): Promise<Post | null> => {
		const posts = await findPublishedPostBySlug(slug);

		if (!posts) {
			return null;
		}

		return {
			author: posts.author?.name ?? '',
			content: posts.content ?? '',
			id: posts.id ?? '',
			title: posts.title ?? '',
			publicationDate: posts.publicationDate ?? '',
			description: posts.description ?? '',
			image: posts.image ?? '',
			lang: posts.lang ?? '',
			related: posts.relatedPosts,
		};
	}
);

export const getLastPostSlug = async (
	locale: string
): Promise<
	{
		slug: string;
		locale: string;
	}[]
> => {
	const posts = await findRecentPosts(1, locale);

	if (posts.length === 0) {
		return [];
	}

	return posts.map((post) => ({
		slug: post.slug,
		locale: post.lang,
	}));
};

const postCardMapper = (
	post: Awaited<ReturnType<typeof findFeaturedPosts>>[0]
): PublicPostCardType => ({
	categories: post.postCategories.map((pc) => pc.category.name),
	id: post.id,
	imageUrl: post.image ?? '',
	title: post.title,
	slug: post.slug,
	url: `/${post.lang}/${post.slug}`,
	author: post?.author?.name ?? '',
});

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
