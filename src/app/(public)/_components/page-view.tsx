'use client';

import { pageViewAction } from '@/app/(public)/_lib/page-view.actions';
import { useEffect } from 'react';

export const PageView = ({ id }: { id: string }) => {
	useEffect(() => {
		if (!process.env.NEXT_PUBLIC_IS_DEV) pageViewAction(id);
	}, [id]);

	return null;
};
