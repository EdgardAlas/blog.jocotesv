'use client';

import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { parseAsString, useQueryState } from 'nuqs';
import { ComponentProps, useRef } from 'react';

const SEARCH_DEBOUNCE = 300;

export type SearchInputProps = ComponentProps<'input'>;

export function SearchInput({
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	onChange,
	className,
	...props
}: SearchInputProps) {
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
			className={cn('mb-3 max-w-sm', className)}
			{...props}
		/>
	);
}

export const SearchInputSekeleton = () => (
	<Skeleton className='mb-3 h-9 max-w-sm' />
);
