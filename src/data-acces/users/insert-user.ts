import { NewUser, users } from '@/drizzle/schema';
import { db, Transaction } from '@/lib/db';

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

