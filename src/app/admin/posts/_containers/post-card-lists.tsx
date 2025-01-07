import {
	PostCard,
	PostCardSkeleton,
} from '@/app/admin/posts/_containers/post-card';
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

	return (
		<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'>
			{posts.data.map((post) => (
				<PostCard {...post} key={post.id} />
			))}
		</div>
	);
};

export const PostCardListSkeleton = () => (
	<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'>
		{Array.from({ length: 4 }).map((_, index) => (
			<PostCardSkeleton key={index} />
		))}
	</div>
);
