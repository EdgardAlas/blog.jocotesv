import { users } from '@/drizzle/schema';
import { db } from '@/lib/db';
import { eq } from 'drizzle-orm';

export const findUserById = (id: string) => {
	return db.query.users.findFirst({
		where: eq(users.id, id),
	});
};

