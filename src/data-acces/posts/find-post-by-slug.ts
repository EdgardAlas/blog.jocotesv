import { posts } from '@/drizzle/schema';
import { db, Transaction } from '@/lib/db';
import { eq } from 'drizzle-orm';

export const findPostBySlug = async (
	slug: string,
	tx: Transaction | typeof db = db
) => {
	return tx.query.posts.findFirst({
		where: eq(posts.slug, slug),
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

