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

	const isLogout = pathname === '/admin/logout';

	if (isAuthenticatedAccessToPublicRoute && !isLogout) {
		return NextResponse.redirect(
			new URL(AUTHENTICATED_REDIRECT_PATH, request.url),
			{
				headers: request.headers,
			}
		);
	}

	if (isUnauthenticatedAccessToProtectedRoute && !isLogout) {
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
