import { insertPostView } from '@/data-acces/page-views.data-access';
import { headers } from 'next/headers';

export const insertPageViewUseCase = async (postId: string) => {
	const requestHeaders = await headers();

	const ip =
		requestHeaders.get('x-forwarded-for') || requestHeaders.get('x-client-ip');

	await insertPostView({
		ipAddress: ip,
		postId,
		userAgent: requestHeaders.get('user-agent'),
	});
};
