import { users } from '@/drizzle/schema';
import { db, Transaction } from '@/lib/db';
import { eq } from 'drizzle-orm';

export const deleteUser = async (
	id: string,
	tx: Transaction | typeof db = db
): Promise<void> => {
	await tx.delete(users).where(eq(users.id, id));
};

