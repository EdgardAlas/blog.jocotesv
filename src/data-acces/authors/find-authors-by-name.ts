import { authors, SelectAuthor } from '@/drizzle/schema';
import { db, Transaction } from '@/lib/db';
import { ilike } from 'drizzle-orm';

export const findAuthorsByName = async (
	search: string,
	tx: Transaction | typeof db = db
): Promise<SelectAuthor[]> => {
	if (!search) {
		return [];
	}

	return tx.query.authors.findMany({
		where: ilike(authors.name, `%${search}%`),
	});
};
