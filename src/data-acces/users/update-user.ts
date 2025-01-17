import { NewUser, users } from '@/drizzle/schema';
import { db, Transaction } from '@/lib/db';
import { eq } from 'drizzle-orm';

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

