import {
	DataTablePagination,
	DataTablePaginationSkeleton,
} from '@/components/data-table/data-table-pagination';
import { AdminTitle } from '@/components/ui/admin-title';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Eye, Trash, Upload } from 'lucide-react';
import { Suspense } from 'react';

const MediaPage = async () => {
	return (
		<>
			<AdminTitle
				title='Media'
				description='Here you can manage all the media files that you have uploaded to every post.'
			>
				<Button icon={Upload}>Upload</Button>
			</AdminTitle>

			<Card>
				<CardHeader />

				<CardContent>
					<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
						{Array.from({ length: 8 }).map((_, index) => (
							<div key={index} className='grid gap-2 rounded border shadow-sm'>
								<div
									className='w-fullb flex h-60 items-center space-x-4 bg-cover bg-center bg-no-repeat'
									style={{
										backgroundImage: 'url(/placeholder.webp)',
									}}
								/>
								<div className='flex items-center justify-between gap-2 p-4'>
									<p className='text-sm font-semibold'>Posts: 0</p>
									<div className='flex gap-2'>
										<Button variant='destructive' size='sm'>
											<Trash size={16} />
										</Button>
										<Button size='sm'>
											<Eye size={16} />
										</Button>
									</div>
								</div>
							</div>
						))}
					</div>

					<Suspense fallback={<DataTablePaginationSkeleton />}>
						<DataTablePagination
							totalPages={1}
							pageSizeOptions={[8, 16, 32, 64]}
							defaultPageSize={8}
						/>
					</Suspense>
				</CardContent>
			</Card>
		</>
	);
};

export default MediaPage;
