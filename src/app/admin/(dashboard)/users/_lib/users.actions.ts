'use server';

import {
	GetUserByIdSchema,
	SaveUserSchema,
} from '@/app/admin/(dashboard)/users/_lib/users.schema';
import { CustomError } from '@/helpers/custom-error';
import { roles } from '@/config/roles';
import { authActionClient } from '@/lib/safe-action';
import {
	deleteUserUseCase,
	findUserByIdUseCase,
	insertUserUseCase,
	updateUserUseCase,
} from '@/use-cases/users.use-case';
import { revalidatePath } from 'next/cache';

export const saveUserAction = authActionClient
	.metadata([roles.admin])
	.schema(SaveUserSchema)
	.action(async ({ parsedInput }) => {
		if (parsedInput.id) {
			await updateUserUseCase(parsedInput.id, parsedInput);
		} else {
			await insertUserUseCase(parsedInput);
		}

		revalidatePath('/admin/users');
	});

export const deleteUserAction = authActionClient
	.metadata([roles.admin])
	.schema(GetUserByIdSchema)
	.action(async ({ parsedInput, ctx: { id } }) => {
		if (id === parsedInput) {
			throw new CustomError('You cannot delete yourself');
		}

		await deleteUserUseCase(parsedInput);
		revalidatePath('/admin/users');
	});

export const findUserByIdAction = authActionClient
	.metadata([roles.admin])
	.schema(GetUserByIdSchema)
	.action(async ({ parsedInput }) => await findUserByIdUseCase(parsedInput));
