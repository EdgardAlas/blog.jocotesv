import { authors, SelectAuthor } from '@/drizzle/schema';
import { db, Transaction } from '@/lib/db';
import { ilike } from 'drizzle-orm';

export const findAuthorByName = async (
	name: string,
	tx: Transaction | typeof db = db
): Promise<SelectAuthor | null> => {
	const result = await tx.query.authors.findFirst({
		where: ilike(authors.name, name.toLowerCase()),
	});
	return result ?? null;
};
