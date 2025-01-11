import {
	PublicPostCardListSkeleton,
	PublicPostList,
} from '@/app/(public)/(home)/_components/public-post-list';
import { Pagination } from '@/components/pagination/pagination';
import { findPaginatedPublicatedPostsUseCase } from '@/use-cases/posts.use-case';

type PostListProps = NextPageWithPagination;

export const SearchResults = async ({ searchParams }: PostListProps) => {
	const { page, search, size } = await searchParams;
	const data = await findPaginatedPublicatedPostsUseCase(
		Number(page) || 1,
		Number(size) || 10,
		search
	);

	return (
		<>
			{data.data.length > 0 ? (
				<PublicPostList
					posts={data.data}
					title={search ? `Search results for "${search}"` : 'Latest posts'}
				/>
			) : (
				<h2 className='mb-4 text-center text-2xl font-bold'>No posts found</h2>
			)}

			<Pagination totalPages={data.totalPages} />
		</>
	);
};

export const SearchResultSkeleton = () => {
	return (
		<>
			<PublicPostCardListSkeleton />
			<Pagination disableButtons />
		</>
	);
};
