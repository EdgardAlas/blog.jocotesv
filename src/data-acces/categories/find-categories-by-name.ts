import { SelectCategory } from '@/drizzle/schema';
import { db, Transaction } from '@/lib/db';
import { ilike, sql } from 'drizzle-orm';

export const findCategoriesByName = async (
	search: string,
	tx: Transaction | typeof db = db
): Promise<SelectCategory[]> => {
	if (!search) {
		return [];
	}

	return tx.query.categories.findMany({
		where: ilike(
			sql`lower(categories.name)`,
			`%${search}%`.toLocaleLowerCase()
		),
	});
};
