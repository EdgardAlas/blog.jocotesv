import {
	SearchInput,
	SearchInputProps,
	SearchInputSekeleton,
} from '@/components/search-input/search-input';
import React, { Suspense } from 'react';

export const SearchInputSuspense = (props: SearchInputProps) => {
	return (
		<Suspense fallback={<SearchInputSekeleton />}>
			<SearchInput {...props} />
		</Suspense>
	);
};
