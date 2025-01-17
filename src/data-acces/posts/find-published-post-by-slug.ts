import { posts } from '@/drizzle/schema';
import { db, Transaction } from '@/lib/db';
import { and, eq, or } from 'drizzle-orm';

export const findPublishedPostBySlug = async (
	slug: string,
	tx: Transaction | typeof db = db
) => {
	const foundPost = await tx.query.posts.findFirst({
		where: and(eq(posts.slug, slug), eq(posts.status, 'published')),
		with: {
			author: true,
			postCategories: {
				with: {
					category: true,
				},
			},
		},
	});

	if (!foundPost) {
		return null;
	}

	const parentId = foundPost?.parentId || foundPost?.id;

	const relatedPosts = await getRelatedPosts(parentId, tx);

	return {
		...foundPost,
		relatedPosts,
	};
};

export const getRelatedPosts = async (
	id: string,
	tx: Transaction | typeof db = db
) => {
	const relatedPosts = await tx.query.posts.findMany({
		where: and(
			eq(posts.status, 'published'),
			or(eq(posts.id, id), eq(posts.parentId, id))
		),
		columns: {
			slug: true,
			id: true,
			parentId: true,
			lang: true,
		},
	});

	return relatedPosts;
};
