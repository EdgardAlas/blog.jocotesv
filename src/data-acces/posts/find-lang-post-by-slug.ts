import { findPostBySlug } from '@/data-acces/posts/find-post-by-slug';
import { posts } from '@/drizzle/schema';
import { db, Transaction } from '@/lib/db';
import { and, eq } from 'drizzle-orm';

export const findLangPostBySlug = async (
	slug: string,
	lang: string,
	tx: Transaction | typeof db = db
) => {
	const post = await findPostBySlug(slug);

	if (!post) {
		return null;
	}

	const langPost = await tx.query.posts.findFirst({
		where: and(eq(posts.parentId, post.id), eq(posts.lang, lang)),
		with: {
			author: true,
			postCategories: {
				with: {
					category: true,
				},
			},
		},
	});

	return {
		post,
		langPost,
	};
};

