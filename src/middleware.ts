import { authMiddleware } from '@/lib/auth-middleware';
import NextAuth from 'next-auth';
import { NextResponse } from 'next/server';

const { auth } = NextAuth(authMiddleware);

const AUTHENTICATED_REDIRECT_PATH = '/admin';
const UNAUTHENTICATED_REDIRECT_PATH = '/admin/login';

export const middleware = auth(async (request) => {
	const { auth, method } = request;
	const { pathname } = request.nextUrl;

	const isPublicRouteWithAuthHandling = ['/admin/login'].includes(pathname);
	const isProtectedRoute =
		pathname.startsWith('/admin') && !isPublicRouteWithAuthHandling;

	const isAuthenticatedAccessToPublicRoute =
		isPublicRouteWithAuthHandling && method === 'GET' && auth;

	const isUnauthenticatedAccessToProtectedRoute =
		isProtectedRoute && method === 'GET' && !auth;

	if (isAuthenticatedAccessToPublicRoute) {
		return NextResponse.redirect(
			new URL(AUTHENTICATED_REDIRECT_PATH, request.url),
			{
				headers: request.headers,
			}
		);
	}

	if (isUnauthenticatedAccessToProtectedRoute) {
		// TODO: make a api request to /api/user to check the user's role and redirect to the correct page based on the role (user to /, admin to /admin)
		//! The role is not included in the token because we want to keep the token as small as possible, and we don't want to expose the role to the client, so we need to make a request to the server to get the role, and the edge functions cannot acces to the database because there are some nodejs apis that are not available in the edge functions
		return NextResponse.redirect(
			new URL(UNAUTHENTICATED_REDIRECT_PATH, request.url),
			{
				headers: request.headers,
			}
		);
	}
});

export const config = {
	matcher: [
		{
			source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
			missing: [
				{ type: 'header', key: 'next-router-prefetch' },
				{ type: 'header', key: 'next-action' },
				{ type: 'header', key: 'purpose', value: 'prefetch' },
			],
		},
	],
};
