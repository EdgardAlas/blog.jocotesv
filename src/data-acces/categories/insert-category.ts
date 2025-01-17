import { categories, NewCategory } from '@/drizzle/schema';
import { db, Transaction } from '@/lib/db';

export const insertCategory = async (
	category: NewCategory,
	tx: Transaction | typeof db = db
): Promise<void> => {
	await tx.insert(categories).values(category);
};
