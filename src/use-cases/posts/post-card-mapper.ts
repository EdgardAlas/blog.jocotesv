import { PublicPostCardType } from '@/app/[locale]/(public)/_types/public-post-card';
import { findFeaturedPosts } from '@/data-acces/posts';

export const postCardMapper = (
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
