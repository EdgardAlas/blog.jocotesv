import 'server-only';

import { SaveUserSchema } from '@/app/admin/(dashboard)/users/_lib/users.schema';
import { UserRow } from '@/app/admin/(dashboard)/users/_types/users';
import {
	countUsers,
	deleteUser,
	findPaginatedUsers,
	insertUser,
	updateUser,
} from '@/data-acces/users.data-acces';
import { users } from '@/drizzle/schema';
import { calculateTotalPages } from '@/helpers/calculate-total-pages';
import { CustomError } from '@/helpers/custom-error';
import { currentUser } from '@/lib/current-user';
import { roles } from '@/config/roles';
import { db } from '@/lib/db';
import { formatDate } from '@/lib/format-dates';
import { hashPassword } from '@/lib/hashing';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

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

export const findUserRoleByEmail = async (email: string) => {
	const role = await db
		.select({
			role: users.role,
		})
		.from(users)
		.where(eq(users.email, email));

	return role[0]?.role;
};

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

export const updateUserUseCase = async (
	id: string,
	data: z.infer<typeof SaveUserSchema>
) => {
	const user = await findUserByEmail(data.email);

	if (user && user.id !== id) {
		throw new CustomError('User already exists');
	}

	if (user?.role === roles.owner) {
		throw new CustomError('You cannot update the owner');
	}

	return updateUser(id, {
		email: data.email,
		role: user?.role === roles.owner ? undefined : data.role,
		name: data.name,
		password: data.password ? await hashPassword(data.password) : undefined,
	});
};

export const findPaginatedUsersUseCase = async (
	page: number,
	pageSize: number,
	search: string
): Promise<WithPagination<UserRow>> => {
	const [users, count, auth] = await Promise.all([
		findPaginatedUsers(page, pageSize, search),
		countUsers(search),
		currentUser(),
	]);

	const mappedUsers: UserRow[] = users.map((user) => ({
		createdAt: formatDate(user.createdAt).format('LLL'),
		email: user.email,
		id: user.id as string,
		name: user.name,
		role: user.role,
		updatedAt: formatDate(user.updatedAt).format('LLL'),
		canBeDeleted: auth?.id !== user.id && user?.role !== roles.owner,
	}));

	return {
		data: mappedUsers,
		totalPages: calculateTotalPages(count, pageSize),
	};
};

export const findUserByIdUseCase = async (id: string): Promise<UserRow> => {
	const user = await findUserById(id);
	const auth = await currentUser();

	if (!user) {
		throw new CustomError('User not found');
	}

	return {
		createdAt: formatDate(user.createdAt).format('LLL'),
		email: user.email,
		id: user.id as string,
		name: user.name,
		role: user.role,
		canBeDeleted: auth?.id !== user.id && auth?.role !== roles.owner,
		updatedAt: formatDate(user.updatedAt).format('LLL'),
	};
};

export const deleteUserUseCase = async (id: string) => {
	const user = await findUserById(id);

	if (user?.role === roles.owner) {
		throw new CustomError('You cannot delete the owner');
	}

	await deleteUser(id);
};

export const findUserByEmailUseCase = async (
	email: string
): Promise<UserRow> => {
	const user = await findUserByEmail(email);
	const auth = await currentUser();

	if (!user) {
		throw new CustomError('User not found');
	}

	return {
		createdAt: formatDate(user.createdAt).format('LLL'),
		email: user.email,
		id: user.id as string,
		name: user.name,
		role: user.role,
		updatedAt: formatDate(user.updatedAt).format('LLL'),
		canBeDeleted: auth?.id !== user.id && auth?.role !== roles.owner,
	};
};
