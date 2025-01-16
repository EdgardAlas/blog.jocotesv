import { authors, NewAuthor } from '@/drizzle/schema';
import { db, Transaction } from '@/lib/db';

export const insertAuthor = async (
	author: NewAuthor,
	tx: Transaction | typeof db = db
): Promise<string> => {
	const result = await tx.insert(authors).values(author).returning({
		id: authors.id,
	});
	return result?.[0].id;
};
