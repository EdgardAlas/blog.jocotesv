import { CustomError } from '@/helpers/custom-error';
import { CredentialsSignin } from 'next-auth';
import {
	createSafeActionClient,
	DEFAULT_SERVER_ERROR_MESSAGE,
} from 'next-safe-action';

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

// TODO: Implement session management and role based access control
export const authActionClient = createSafeActionClient({
	handleServerError,
});
