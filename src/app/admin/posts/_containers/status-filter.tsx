'use client';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { parseAsString, useQueryState } from 'nuqs';
import { useTransition } from 'react';

export const StatusFilter = () => {
	const [loading, startTransition] = useTransition();

	const [status, setStatus] = useQueryState(
		'status',
		parseAsString.withDefault('all').withOptions({
			clearOnDefault: true,
			shallow: false,
			startTransition,
		})
	);

	return (
		<Select defaultValue={status} disabled={loading} onValueChange={setStatus}>
			<SelectTrigger className='min-[415px]:max-w-36'>
				<SelectValue placeholder='Filter by status' />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value='all'>All</SelectItem>
				<SelectItem value='draft'>Draft</SelectItem>
				<SelectItem value='published'>Published</SelectItem>
			</SelectContent>
		</Select>
	);
};

export const StatusFilterSkeleton = () => (
	<Skeleton className='mb-3 h-9 w-full min-[415px]:max-w-36' />
);
