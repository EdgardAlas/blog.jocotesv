import { SaveUserSchema } from '@/app/admin/(dashboard)/users/_lib/users.schema';
import { roles } from '@/config/roles';
import { findUserByEmail, updateUser } from '@/data-acces/users';
import { CustomError } from '@/helpers/custom-error';
import { currentUser } from '@/lib/current-user';
import { hashPassword } from '@/lib/hashing';
import { z } from 'zod';

export const updateUserUseCase = async (
	id: string,
	data: z.infer<typeof SaveUserSchema>
) => {
	const user = await findUserByEmail(data.email);

	const authUser = await currentUser();

	if (user && user.id !== id) {
		throw new CustomError('User already exists');
	}

	if (user?.role === roles.owner && data.role !== roles.owner) {
		throw new CustomError('You cannot update the owner role');
	}

	if (user?.role === roles.owner && authUser?.role !== roles.owner) {
		throw new CustomError('You cannot update the owner role');
	}

	return updateUser(id, {
		email: data.email,
		role: user?.role === roles.owner ? undefined : data.role,
		name: data.name,
		password: data.password ? await hashPassword(data.password) : undefined,
	});
};
