import { findRecentPosts } from '@/data-acces/posts';

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

