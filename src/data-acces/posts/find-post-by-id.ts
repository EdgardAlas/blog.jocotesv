import { posts } from '@/drizzle/schema';
import { db, Transaction } from '@/lib/db';
import { eq } from 'drizzle-orm';

export const findPostById = async (
	id: string,
	tx: Transaction | typeof db = db
) => {
	return tx.query.posts.findFirst({
		where: eq(posts.id, id),
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

