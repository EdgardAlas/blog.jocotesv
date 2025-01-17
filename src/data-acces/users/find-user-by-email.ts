import { users } from '@/drizzle/schema';
import { db } from '@/lib/db';
import { eq } from 'drizzle-orm';

export const findUserByEmail = (email: string) => {
	return db.query.users.findFirst({
		where: eq(users.email, email),
	});
};
