import { posts } from '@/drizzle/schema';
import { db, Transaction } from '@/lib/db';
import { and, desc, eq } from 'drizzle-orm';

export const findRecentPosts = async (
	count: number,
	locale: string,
	tx: Transaction | typeof db = db
) => {
	return tx.query.posts.findMany({
		limit: count,
		columns: {
			id: true,
			title: true,
			slug: true,
			status: true,
			image: true,
			publicationDate: true,
			featured: true,
			updatedAt: true,
			lang: true,
		},
		orderBy: desc(posts.publicationDate),
		where: and(eq(posts.status, 'published'), eq(posts.lang, locale)),
		with: {
			author: true,
			postCategories: {
				with: {
					category: true,
				},
			},
		},
	});
};
