import {
	Pagination,
	PaginationSkeleton,
} from '@/components/pagination/pagination';
import { SearchInputSuspense } from '@/components/search-input/search-input-suspense';
import { AddItemCrudButton } from '@/components/ui/add-item-crud-button';
import { AdminTitle } from '@/components/ui/admin-title';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Trash } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

const PostsPage = () => {
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
						<Select>
							<SelectTrigger className='min-[415px]:max-w-36'>
								<SelectValue placeholder='Filter by status' />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='draft'>Draft</SelectItem>
								<SelectItem value='published'>Published</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'>
						{Array.from({ length: 3 }).map((_, index) => (
							<Link href='/admin/post/1' key={index}>
								<div key={index} className='grid rounded border shadow-sm'>
									<div
										className='w-fullb flex h-60 items-center space-x-4 bg-cover bg-center bg-no-repeat'
										style={{
											backgroundImage: 'url(/placeholder.webp)',
										}}
									/>
									<div className='grid gap-2 p-4'>
										<div className='flex flex-wrap gap-2'>
											{Array.from({ length: 2 }).map((_, index) => (
												<Badge key={index}>Tag {index + 1}</Badge>
											))}
										</div>
										<div className='gap- flex items-center justify-between'>
											<div>
												<p className='text-sm font-semibold'>
													Post title {index + 1}
												</p>
												<p className='text-xs text-gray-500'>
													Post description
												</p>
											</div>
											<div className='flex gap-2'>
												<Button variant='destructive' size='sm'>
													<Trash size={16} />
												</Button>
											</div>
										</div>
									</div>
								</div>
							</Link>
						))}
					</div>

					<Suspense fallback={<PaginationSkeleton />}>
						<Pagination pageSizeOptions={[8, 16, 32, 64]} defaultPageSize={8} />
					</Suspense>
				</CardContent>
			</Card>
		</>
	);
};

export default PostsPage;
