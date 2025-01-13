'use client';

import { postView } from '@/app/(public)/_lib/post-view.actions';
import { useEffect } from 'react';

export const PostView = ({ slug }: { slug: string }) => {
	useEffect(() => {
		if (!process.env.NEXT_PUBLIC_IS_DEV) postView(slug);
	}, [slug]);

	return null;
};
