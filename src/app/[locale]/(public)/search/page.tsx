import {
	SearchResults,
	SearchResultSkeleton,
} from '@/app/[locale]/(public)/search/_components/search-results';
import { SearchInput } from '@/components/search-input/search-input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { getScopedI18n } from '@/locales/server';
import { Suspense } from 'react';

type SearchPageProps = NextPageWithPagination & {
	params: Promise<{ locale: string }>;
};

const SearchPage = async ({ searchParams, params }: SearchPageProps) => {
	const { search, page, size } = await searchParams;
	const { locale } = await params;
	const t = await getScopedI18n('navbar');

	return (
		<div>
			<Card>
				<CardHeader />
				<CardContent className='space-y-8 px-6 md:px-8'>
					<SearchInput placeholder={t('search')} />
					<Suspense
						fallback={<SearchResultSkeleton />}
						key={`${search}-${page}-${size}`}
					>
						<SearchResults searchParams={searchParams} locale={locale} />
					</Suspense>
				</CardContent>
			</Card>
		</div>
	);
};

export default SearchPage;
