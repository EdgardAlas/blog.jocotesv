import {
	StatusFilter,
	StatusFilterSkeleton,
} from '@/app/admin/posts/_containers/status-filter';
import { Suspense } from 'react';

export const StatusFilterSuspense = () => {
	return (
		<Suspense fallback={<StatusFilterSkeleton />}>
			<StatusFilter />
		</Suspense>
	);
};
