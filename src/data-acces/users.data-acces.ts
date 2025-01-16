import { NewUser, users } from '@/drizzle/schema';
import { db, Transaction } from '@/lib/db';
import { desc, eq, ilike, sql } from 'drizzle-orm';

export const insertUser = async (
	user: NewUser,
	tx: Transaction | typeof db = db
): Promise<string> => {
	const response = await tx
		.insert(users)
		.values(user)
		.returning({ id: users.id });

	return response?.[0].id;
};

export const updateUser = async (
	id: string,
	user: Partial<NewUser>,
	tx: Transaction | typeof db = db
): Promise<void> => {
	const response = await tx
		.update(users)
		.set(user)
		.where(eq(users.id, id))
		.returning({ id: users.id });

	if (!response.length) {
		throw new Error('User not found');
	}
};

export const deleteUser = async (
	id: string,
	tx: Transaction | typeof db = db
): Promise<void> => {
	await tx.delete(users).where(eq(users.id, id));
};

export const countUsers = async (
	search: string,
	tx: Transaction | typeof db = db
): Promise<number> => {
	const result = await tx
		.select({
			count: sql`count(*)`.mapWith(Number),
		})
		.from(users)
		.where(search ? ilike(users.name, `%${search}%`) : undefined);

	return result[0].count;
};

export const findUserByEmail = (email: string) => {
	return db.query.users.findFirst({
		where: eq(users.email, email),
	});
};

export const findUserById = (id: string) => {
	return db.query.users.findFirst({
		where: eq(users.id, id),
	});
};

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
