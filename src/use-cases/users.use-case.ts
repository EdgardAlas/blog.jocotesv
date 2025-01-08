import 'server-only';

import { users } from '@/drizzle/schema';
import { db } from '@/lib/db';
import { eq } from 'drizzle-orm';

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

export const getUserRoleByEmail = async (email: string) => {
	const role = await db
		.select({
			role: users.role,
		})
		.from(users)
		.where(eq(users.email, email));

	return role[0]?.role;
};
