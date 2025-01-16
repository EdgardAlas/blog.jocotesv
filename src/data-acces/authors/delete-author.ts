import { authors } from '@/drizzle/schema';
import { db, Transaction } from '@/lib/db';
import { eq } from 'drizzle-orm';

export const deleteAuthor = async (
	id: string,
	tx: Transaction | typeof db = db
): Promise<void> => {
	await tx.delete(authors).where(eq(authors.id, id));
};
