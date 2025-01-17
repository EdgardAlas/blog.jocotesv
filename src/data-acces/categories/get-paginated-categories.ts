import { categories, NewCategory } from '@/drizzle/schema';
import { db, Transaction } from '@/lib/db';
import { desc, ilike } from 'drizzle-orm';

export const getPaginatedCategories = async (
	page: number,
	pageSize: number,
	search: string,
	tx: Transaction | typeof db = db
): Promise<NewCategory[]> => {
	return tx.query.categories.findMany({
		limit: pageSize,
		offset: (page - 1) * pageSize,
		where: search ? ilike(categories.name, `%${search}%`) : undefined,
		orderBy: desc(categories.updatedAt),
	});
};
