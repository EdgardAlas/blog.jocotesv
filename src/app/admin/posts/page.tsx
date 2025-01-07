import {
	PostCardLists,
	PostCardListSkeleton,
} from '@/app/admin/posts/_containers/post-card-lists';
import { StatusFilterSuspense } from '@/app/admin/posts/_containers/status-filter-suspense';
import { PaginationSuspense } from '@/components/pagination/pagination-suspense';
import { SearchInputSuspense } from '@/components/search-input/search-input-suspense';
import { AddItemCrudButton } from '@/components/ui/add-item-crud-button';
import { AdminTitle } from '@/components/ui/admin-title';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Link from 'next/link';
import { Suspense } from 'react';

type PostsPageProps = {
	searchParams: Promise<{
		search: string;
		page: string;
		size: string;
		status: string;
	}>;
};

const PostsPage = async ({ searchParams }: PostsPageProps) => {
	const { search, page, size, status } = await searchParams;

	return (
		<>
			<AdminTitle
				title='Posts'
				description='Here you can manage all the posts that you have created.'
			>
				<AddItemCrudButton asChild>
					<Link href='/admin/post'>Add Post</Link>
				</AddItemCrudButton>
			</AdminTitle>

			<Card>
				<CardHeader />

				<CardContent>
					<div className='mb-4 flex flex-col gap-x-2 min-[415px]:flex-row'>
						<SearchInputSuspense />
						<StatusFilterSuspense />
					</div>

					<Suspense
						key={`${search}-${page}-${size}-${status}`}
						fallback={<PostCardListSkeleton />}
					>
						<PostCardLists searchParams={searchParams} />
					</Suspense>

					<PaginationSuspense
						defaultPageSize={8}
						pageSizeOptions={[8, 16, 32, 64]}
					/>
				</CardContent>
			</Card>
		</>
	);
};

export default PostsPage;
