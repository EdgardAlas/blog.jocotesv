import {
	PostCard,
	PostCardSkeleton,
} from '@/app/admin/(dashboard)/posts/_components/post-card';
import { Pagination } from '@/components/pagination/pagination';
import { findPaginatedPostsUseCase } from '@/use-cases/post.use-case';

interface PostCardListsProps {
	searchParams: Promise<{
		search: string;
		page: string;
		size: string;
		status: string;
	}>;
}

export const PostCardLists = async ({ searchParams }: PostCardListsProps) => {
	const { search, page, size, status = 'all' } = await searchParams;
	const posts = await findPaginatedPostsUseCase(
		Number(page) || 1,
		Number(size) || 8,
		{
			search: search,
			status: status === 'all' ? '' : status,
		}
	);

	if (posts.data.length === 0) {
		return (
			<p className='mt-8 text-center text-lg text-gray-500'>No posts found</p>
		);
	}

	return (
		<div>
			<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'>
				{posts.data.map((post) => (
					<PostCard {...post} key={post.id} />
				))}
			</div>
			<Pagination
				defaultPageSize={8}
				pageSizeOptions={[8, 16, 32, 64]}
				totalPages={posts.totalPages}
			/>
		</div>
	);
};

export const PostCardListSkeleton = () => (
	<>
		<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'>
			{Array.from({ length: 4 }).map((_, index) => (
				<PostCardSkeleton key={index} />
			))}
		</div>
		<Pagination
			defaultPageSize={8}
			pageSizeOptions={[8, 16, 32, 64]}
			disableButtons
		/>
	</>
);
