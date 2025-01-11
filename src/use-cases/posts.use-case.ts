import { Post } from '@/app/(public)/[slug]/_types/post';
import { PostCardType } from '@/app/(public)/_types/post-card';
import {
	countPublicatedPosts,
	findFeaturedPosts,
	findPaginatedPublicatedPosts,
	findPublishedPostBySlug,
	findRecentPosts,
} from '@/data-acces/posts.data-acces';
import { calculateTotalPages } from '@/helpers/calculate-total-pages';
import { cache } from 'react';

export const findHomePagePostsUseCase = async (): Promise<{
	featuredPosts: PostCardType[];
	recentPosts: PostCardType[];
}> => {
	const [featuredPosts, recentPosts] = await Promise.all([
		findFeaturedPosts(4),
		findRecentPosts(8),
	]);

	const mappedFeaturedPosts: PostCardType[] = featuredPosts.map((post) =>
		postCardMapper(post)
	);

	const mappedRecentPosts: PostCardType[] = recentPosts.map((post) =>
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
			content: posts.content,
			id: posts.id,
			title: posts.title,
			publicationDate: posts.publicationDate ?? '',
			description: posts.description ?? '',
			image: posts.image ?? '',
		};
	}
);

export const getLastPostSlug = async (): Promise<string[]> => {
	const posts = await findRecentPosts(1);

	if (posts.length === 0) {
		return [];
	}

	return posts.map((post) => post.slug);
};

const postCardMapper = (
	post: Awaited<ReturnType<typeof findFeaturedPosts>>[0]
): PostCardType => ({
	categories: post.postCategories.map((pc) => pc.category.name),
	id: post.id,
	imageUrl: post.image ?? '',
	title: post.title,
	slug: post.slug,
	url: `/${post.slug}`,
	author: post?.author?.name ?? '',
});

export const findPaginatedPublicatedPostsUseCase = async (
	page: number,
	limit: number,
	search: string
): Promise<WithPagination<PostCardType>> => {
	const [posts, total] = await Promise.all([
		findPaginatedPublicatedPosts(page, limit, search),
		countPublicatedPosts(search),
	]);

	const mappedPosts: PostCardType[] = posts.map(postCardMapper);

	return {
		data: mappedPosts,
		totalPages: calculateTotalPages(total, limit),
	};
};
