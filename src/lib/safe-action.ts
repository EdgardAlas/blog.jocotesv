import { CustomError } from '@/helpers/custom-error';
import { currentUser } from '@/lib/current-user';
import { roles, rolesEnum } from '@/config/roles';
import { CredentialsSignin } from 'next-auth';
import {
	createSafeActionClient,
	DEFAULT_SERVER_ERROR_MESSAGE,
} from 'next-safe-action';
import { z } from 'zod';

const handleServerError = (e: Error) => {
	if (e instanceof CustomError) {
		return e.message;
	}

	if (e instanceof CredentialsSignin) {
		return 'The email or password you entered is incorrect.';
	}

	return DEFAULT_SERVER_ERROR_MESSAGE;
};

export const actionClient = createSafeActionClient({
	handleServerError,
});

export const authActionClient = createSafeActionClient({
	handleServerError,
	defineMetadataSchema: () => z.array(z.enum(rolesEnum)),
}).use(async ({ metadata, next }) => {
	const user = await currentUser();

	if (!user) throw new CustomError('You are not authenticated.');

	if (!user.role) {
		throw new CustomError('You are not authorized to perform this action.');
	}

	if (!metadata.includes(user.role) && user.role !== roles.owner) {
		throw new CustomError('You are not authorized to perform this action.');
	}

	return next({
		ctx: {
			...user,
		},
	});
});
