import { signOut } from '@/lib/auth';

export const GET = async () => {
	await signOut({ redirect: true, redirectTo: '/admin' });
};
