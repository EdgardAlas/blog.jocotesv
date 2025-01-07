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
import { findPaginatedPostsUseCase } from '@/use-cases/post.use-case';
import { Trash } from 'lucide-react';
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
						<Select defaultValue={status}>
							<SelectTrigger className='min-[415px]:max-w-36'>
								<SelectValue placeholder='Filter by status' />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='all'>All</SelectItem>
								<SelectItem value='draft'>Draft</SelectItem>
								<SelectItem value='published'>Published</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'>
						{posts.data.map((post) => (
							<Link href={`/admin/post/${post.slug}`} key={post.id}>
								<div className='grid h-full cursor-pointer overflow-hidden rounded border shadow-sm transition-transform duration-300 hover:scale-105'>
									<div
										className='w-fullb o flex h-60 items-center space-x-4 bg-cover bg-center bg-no-repeat'
										style={{
											backgroundImage: post.image
												? `url(${post.image})`
												: 'url(/placeholder.webp)',
										}}
									/>
									<div className='grid gap-2 p-4'>
										{post.categories.length ? (
											<div className='flex flex-wrap gap-2'>
												{post.categories.map((category, index) => (
													<Badge key={index}>{category}</Badge>
												))}
											</div>
										) : (
											<div>
												<Badge>No category</Badge>
											</div>
										)}
										<div className='gap- flex items-center justify-between'>
											<div>
												{post.title && (
													<p className='text-sm font-semibold'>{post.title}</p>
												)}
												{post.description && (
													<p className='text-xs text-gray-500'>
														{post.description}
													</p>
												)}
												{post.author && (
													<div>
														<p className='text-xs text-gray-600'>
															By {post.author}
														</p>
													</div>
												)}
												{post.publicationDate && (
													<p className='text-xs text-gray-600'>
														{post.publicationDate}
													</p>
												)}
											</div>
											<div className='flex gap-2'>
												<Button
													variant='destructive'
													size='sm'
													/* onClick={async (e) => {
														e.preventDefault();
														await deletePostAction(post.id);
													}} */
												>
													<Trash size={16} />
												</Button>
											</div>
										</div>
										<p className='text-xs text-gray-600'>
											The post was last updated on{' '}
											<span className='font-semibold'>{post.updatedAt}</span>
										</p>
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
