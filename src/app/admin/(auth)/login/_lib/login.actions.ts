'use server';

import { signIn } from '@/lib/auth';
import { actionClient } from '@/lib/safe-action';
import { loginSchema } from './login.schema';

export const loginAction = actionClient
	.schema(loginSchema)
	.action(async ({ parsedInput: values }) => {
		await signIn('credentials', {
			redirect: true,
			redirectTo: '/admin',
			...values,
		});
	});
