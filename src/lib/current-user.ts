import { auth } from '@/lib/auth';
import { Role } from '@/config/roles';
import { findUserById } from '@/use-cases/users.use-case';
import { redirect } from 'next/navigation';
import { cache } from 'react';

interface User {
	id: string;
	name: string;
	email: string;
	role?: Role;
}

export const currentUser = cache(async (): Promise<User | undefined> => {
	const session = await auth();
	if (!session) {
		return undefined;
	}

	if (!session.user) {
		return undefined;
	}

	const user = await findUserById(session.user.id as string);

	if (!user) {
		return redirect('/admin/logout');
	}

	return {
		id: user.id,
		name: user.name,
		email: user.email,
		role: user.role as Role,
	} satisfies User;
});