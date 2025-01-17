import { posts } from '@/drizzle/schema';
import { db, Transaction } from '@/lib/db';
import { and, eq, ilike } from 'drizzle-orm';

export const countPosts = (
	{ search, status }: { search: string; status: string } = {
		search: '',
		status: '',
	},
	tx: Transaction | typeof db = db
): Promise<number> => {
	return tx.$count(
		posts,
		and(
			search ? ilike(posts.title, `%${search}%`) : undefined,
			status ? eq(posts.status, status) : undefined
		)
	);
};
