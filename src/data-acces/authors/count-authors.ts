import { authors } from '@/drizzle/schema';
import { db, Transaction } from '@/lib/db';
import { ilike } from 'drizzle-orm';

export const countAuthors = (
	search: string,
	tx: Transaction | typeof db = db
): Promise<number> => {
	return tx.$count(
		authors,
		search ? ilike(authors.name, `%${search}%`) : undefined
	);
};
