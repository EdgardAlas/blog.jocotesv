'use client';

import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { parseAsString, useQueryState } from 'nuqs';
import { useRef } from 'react';

const SEARCH_DEBOUNCE = 300;

export function SearchInput() {
	const [searchTerm, setSearchTerm] = useQueryState(
		'search',
		parseAsString.withDefault('').withOptions({
			shallow: false,
			clearOnDefault: true,
		})
	);

	const debounceRef = useRef<NodeJS.Timeout>(null);

	return (
		<Input
			placeholder='Search...'
			defaultValue={searchTerm}
			onChange={(e) => {
				if (debounceRef.current) {
					clearTimeout(debounceRef.current);
				}

				debounceRef.current = setTimeout(() => {
					setSearchTerm(e.target.value);
				}, SEARCH_DEBOUNCE);
			}}
			className='mb-3 max-w-sm'
		/>
	);
}

export const SearchInputSekeleton = () => (
	<Skeleton className='mb-3 h-9 max-w-sm' />
);
