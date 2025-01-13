import {
	deletePostViewsByPostId,
	insertPostView,
} from '@/data-acces/page-views.data-access';
import { headers } from 'next/headers';

export const insertPageViewUseCase = async (postId: string) => {
	const requestHeaders = await headers();

	const ip =
		requestHeaders.get('cf-connecting-ip') ||
		requestHeaders.get('x-forwarded-for');

	const country = requestHeaders.get('cf-ipcountry');

	await insertPostView({
		ipAddress: ip,
		postId,
		userAgent: requestHeaders.get('user-agent'),
		country,
	});
};

export const deletePageViewsByPostIdUseCase = async (postId: string) => {
	await deletePostViewsByPostId(postId);
};
