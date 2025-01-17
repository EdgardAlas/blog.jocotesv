import { loginSchema } from '@/app/admin/(auth)/login/_lib/login.schema';
import { findUserByEmail } from '@/data-acces/users/find-user-by-email';
import { authMiddleware } from '@/lib/auth-middleware';
import { comparePassword } from '@/lib/hashing';

import NextAuth from 'next-auth';
import credentials from 'next-auth/providers/credentials';

export const {
	handlers,
	signIn,
	signOut,
	auth,
	unstable_update: update,
} = NextAuth({
	...authMiddleware,
	providers: [
		credentials({
			credentials: {
				email: {},
				password: {},
			},
			authorize: async (credentials) => {
				const parsedValues = await loginSchema.parseAsync(credentials);

				const userExists = await findUserByEmail(parsedValues.email);

				if (!userExists) {
					return null;
				}

				const passwordMatch = await comparePassword(
					parsedValues.password,
					userExists.password
				);

				if (!passwordMatch) {
					return null;
				}

				return {
					id: userExists.id,
				};
			},
		}),
	],
});
