import { signOut } from '@/lib/auth';
import { currentUser } from '@/lib/current-user';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
	const user = await currentUser();

	if (!user) {
		return NextResponse.redirect(new URL('/login', request.url));
	}

	await signOut({ redirect: true, redirectTo: '/' });
};
