import { Post } from '@/app/(public)/[slug]/_types/post';
import { PostCardType } from '@/app/(public)/_types/post-card';
import {
	findFeaturedPosts,
	findPublishedPostBySlug,
	findRecentPosts,
} from '@/data-acces/posts.data-acces';
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

export const findInvalidPostsUseCase = cache(
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
});
