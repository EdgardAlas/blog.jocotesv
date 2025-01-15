import {
	PublicPostCardListSkeleton,
	PublicPostList,
} from '@/app/[locale]/(public)/(home)/_components/public-post-list';
import { Pagination } from '@/components/pagination/pagination';
import { getScopedI18n } from '@/locales/server';
import { findPaginatedPublicatedPostsUseCase } from '@/use-cases/posts.use-case';

type PostListProps = NextPageWithPagination & { locale: string };

export const SearchResults = async ({
	searchParams,
	locale,
}: PostListProps) => {
	const { page, search, size } = await searchParams;
	const data = await findPaginatedPublicatedPostsUseCase(
		Number(page) || 1,
		Number(size) || 10,
		search,
		locale
	);
	const t = await getScopedI18n('search');
	const tPagination = await getScopedI18n('pagination');

	return (
		<>
			{data.data.length > 0 ? (
				<PublicPostList
					posts={data.data}
					title={search ? t('resultsFor', { search }) : t('latestPosts')}
				/>
			) : (
				<h2 className='text-center text-2xl font-bold'>{t('notPostFound')}</h2>
			)}

			<Pagination
				totalPages={data.totalPages}
				rowsPerPageText={tPagination('rowsPerPage')}
			/>
		</>
	);
};

export const SearchResultSkeleton = async () => {
	const t = await getScopedI18n('pagination');
	return (
		<>
			<PublicPostCardListSkeleton />
			<Pagination disableButtons rowsPerPageText={t('rowsPerPage')} />
		</>
	);
};
