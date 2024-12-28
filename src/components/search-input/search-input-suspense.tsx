import {
	SearchInput,
	SearchInputSekeleton,
} from '@/components/search-input/search-input';
import React, { Suspense } from 'react';

export const SearchInputSuspense = () => {
	return (
		<Suspense fallback={<SearchInputSekeleton />}>
			<SearchInput />
		</Suspense>
	);
};
