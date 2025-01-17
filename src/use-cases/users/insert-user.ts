import { SaveUserSchema } from '@/app/admin/(dashboard)/users/_lib/users.schema';
import { findUserByEmail, insertUser } from '@/data-acces/users';
import { CustomError } from '@/helpers/custom-error';
import { hashPassword } from '@/lib/hashing';
import { z } from 'zod';

export const insertUserUseCase = async (
	user: Omit<z.infer<typeof SaveUserSchema>, 'id'>
) => {
	const findUser = await findUserByEmail(user.email);

	if (findUser) {
		throw new CustomError('Email already exists');
	}

	if (!user.password) {
		throw new CustomError('Password is required');
	}

	return insertUser({
		email: user.email,
		role: user.role,
		name: user.name,
		password: await hashPassword(user.password),
	});
};
