import {
	Pagination,
	PaginationSkeleton,
} from '@/components/pagination/pagination';
import React, { Suspense } from 'react';

export const PaginationSuspense = () => {
	return (
		<Suspense fallback={<PaginationSkeleton />}>
			<Pagination />
		</Suspense>
	);
};
