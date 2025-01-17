import { categories } from '@/drizzle/schema';
import { db, Transaction } from '@/lib/db';
import { ilike } from 'drizzle-orm';

export const countCategories = (
	search: string,
	tx: Transaction | typeof db = db
): Promise<number> => {
	return tx.$count(
		categories,
		search ? ilike(categories.name, `%${search}%`) : undefined
	);
};
