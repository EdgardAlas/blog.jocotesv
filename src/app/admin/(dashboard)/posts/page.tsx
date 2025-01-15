import {
	PostCardLists,
	PostCardListSkeleton,
} from '@/app/admin/(dashboard)/posts/_components/post-card-lists';
import { StatusFilter } from '@/app/admin/(dashboard)/posts/_components/status-filter';
import { SearchInput } from '@/components/search-input/search-input';
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
				<AddItemCrudButton asChild noOpenModal>
					<Link href='/admin/post'>Add Post</Link>
				</AddItemCrudButton>
			</AdminTitle>

			<Card>
				<CardHeader />

				<CardContent>
					<div className='mb-4 flex flex-col gap-x-2 min-[415px]:flex-row'>
						<SearchInput placeholder={'Search...'} />
						<StatusFilter />
					</div>

					<Suspense
						key={`${search}-${page}-${size}-${status}`}
						fallback={<PostCardListSkeleton />}
					>
						<PostCardLists searchParams={searchParams} />
					</Suspense>
				</CardContent>
			</Card>
		</>
	);
};

export default PostsPage;
