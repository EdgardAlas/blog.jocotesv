import {
	SearchResults,
	SearchResultSkeleton,
} from '@/app/(public)/search/_components/search-results';
import { SearchInput } from '@/components/search-input/search-input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Suspense } from 'react';

type SearchPageProps = NextPageWithPagination;

const SearchPage = async ({ searchParams }: SearchPageProps) => {
	const { search, page, size } = await searchParams;

	return (
		<div>
			<Card>
				<CardHeader />
				<CardContent className='space-y-8 px-6 md:px-8'>
					<SearchInput />
					<Suspense
						fallback={<SearchResultSkeleton />}
						key={`${search}-${page}-${size}`}
					>
						<SearchResults searchParams={searchParams} />
					</Suspense>
				</CardContent>
			</Card>
		</div>
	);
};

export default SearchPage;
