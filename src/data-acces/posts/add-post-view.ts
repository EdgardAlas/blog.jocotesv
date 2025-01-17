import { posts } from '@/drizzle/schema';
import { db, Transaction } from '@/lib/db';
import { eq, sql } from 'drizzle-orm';

export const addPostView = async (
	slug: string,
	tx: Transaction | typeof db = db
) => {
	const response = await tx
		.update(posts)
		.set({
			views: sql`${posts.views} + 1`,
		})
		.where(eq(posts.slug, slug))
		.returning({
			views: posts.views,
		});

	return response[0].views;
};
