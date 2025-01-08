import { NextAuthConfig } from 'next-auth';

export const authMiddleware = {
	providers: [],
	callbacks: {
		async session({ session, token }) {
			return {
				...session,
				user: {
					...session.user,
					id: token.sub,
				},
			};
		},
	},
	session: {
		maxAge: 1 * 24 * 60 * 60, // 1 day
	},
} satisfies NextAuthConfig;
