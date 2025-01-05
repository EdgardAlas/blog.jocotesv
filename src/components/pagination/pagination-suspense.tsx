import {
	Pagination,
	PaginationProps,
	PaginationSkeleton,
} from '@/components/pagination/pagination';
import React, { Suspense } from 'react';

export const PaginationSuspense = (props: PaginationProps) => {
	return (
		<Suspense fallback={<PaginationSkeleton />}>
			<Pagination {...props} />
		</Suspense>
	);
};
