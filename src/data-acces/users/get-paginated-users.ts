import { NewUser, users } from '@/drizzle/schema';
import { db, Transaction } from '@/lib/db';
import { desc, ilike } from 'drizzle-orm';

export const findPaginatedUsers = async (
	page: number,
	pageSize: number,
	search: string,
	tx: Transaction | typeof db = db
): Promise<NewUser[]> => {
	return tx.query.users.findMany({
		limit: pageSize,
		orderBy: desc(users.updatedAt),
		offset: (page - 1) * pageSize,
		where: search ? ilike(users.name, `%${search}%`) : undefined,
	});
};
