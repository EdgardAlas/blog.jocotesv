import { users } from '@/drizzle/schema';
import { db, Transaction } from '@/lib/db';
import { ilike } from 'drizzle-orm';

export const countUsers = (
	search: string,
	tx: Transaction | typeof db = db
): Promise<number> => {
	return tx.$count(
		users,
		search ? ilike(users.name, `%${search}%`) : undefined
	);
};
