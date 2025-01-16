import { authors, SelectAuthor } from '@/drizzle/schema';
import { db, Transaction } from '@/lib/db';
import { eq } from 'drizzle-orm';

export const findAuthorById = async (
	id: string,
	tx: Transaction | typeof db = db
): Promise<SelectAuthor | null> => {
	const result = await tx.select().from(authors).where(eq(authors.id, id));
	return result?.[0] ?? null;
};
