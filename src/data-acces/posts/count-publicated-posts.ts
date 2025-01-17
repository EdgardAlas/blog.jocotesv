import { posts } from '@/drizzle/schema';
import { db, Transaction } from '@/lib/db';
import { and, eq, ilike } from 'drizzle-orm';

export const countPublicatedPosts = (
	search: string,
	tx: Transaction | typeof db = db
): Promise<number> => {
	return tx.$count(
		posts,
		and(
			eq(posts.status, 'published'),
			search ? ilike(posts.title, `%${search}%`) : undefined
		)
	);
};
