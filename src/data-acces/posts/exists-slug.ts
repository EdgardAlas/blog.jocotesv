import { posts } from '@/drizzle/schema';
import { db, Transaction } from '@/lib/db';
import { ilike } from 'drizzle-orm';

export const existsSlug = (slug: string, tx: Transaction | typeof db = db) => {
	return tx.query.posts.findFirst({
		columns: {
			slug: true,
			id: true,
		},
		where: ilike(posts.slug, slug),
	});
};

