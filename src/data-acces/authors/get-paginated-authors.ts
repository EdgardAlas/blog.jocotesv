import { authors, SelectAuthor } from '@/drizzle/schema';
import { db, Transaction } from '@/lib/db';
import { ilike } from 'drizzle-orm';

export const getPaginatedAuthors = async (
	page: number,
	pageSize: number,
	search: string,
	tx: Transaction | typeof db = db
): Promise<SelectAuthor[]> => {
	return tx.query.authors.findMany({
		limit: pageSize,
		offset: (page - 1) * pageSize,
		where: search ? ilike(authors.name, `%${search}%`) : undefined,
	});
};
