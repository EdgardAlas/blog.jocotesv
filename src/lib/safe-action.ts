import { CustomError } from '@/helpers/custom-error';
import { createSafeActionClient } from 'next-safe-action';

const handleServerError = (e: Error) => {
	if (e instanceof CustomError) {
		return e.message;
	}

	console.log(e.message);

	return 'An error occurred. Please try again later.';
};

export const actionClient = createSafeActionClient({
	handleServerError,
});

// TODO: Implement session management and role based access control
export const authActionClient = createSafeActionClient({
	handleServerError,
});
