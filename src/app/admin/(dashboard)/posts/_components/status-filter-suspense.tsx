import {
	StatusFilter,
	StatusFilterSkeleton,
} from '@/app/admin/(dashboard)/posts/_components/status-filter';
import { Suspense } from 'react';

export const StatusFilterSuspense = () => {
	return (
		<Suspense fallback={<StatusFilterSkeleton />}>
			<StatusFilter />
		</Suspense>
	);
};
