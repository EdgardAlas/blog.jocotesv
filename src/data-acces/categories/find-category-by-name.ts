import { SelectCategory } from '@/drizzle/schema';
import { db, Transaction } from '@/lib/db';
import { ilike, sql } from 'drizzle-orm';

export const findCategoryByName = async (
	search: string,
	tx: Transaction | typeof db = db
): Promise<SelectCategory | null> => {
	const result = await tx.query.categories.findFirst({
		where: ilike(sql`lower(categories.name)`, search.toLocaleLowerCase()),
	});

	return result ?? null;
};
