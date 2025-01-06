import { ImageCard } from '@/app/admin/media/_containers/image-card';
import { UploadImageForm } from '@/app/admin/media/_containers/upload-image-form';
import { UploadMediaButton } from '@/app/admin/media/_containers/upload-media-button';
import { PaginationSuspense } from '@/components/pagination/pagination-suspense';
import { AdminTitle } from '@/components/ui/admin-title';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { findPaginatedMediaUseCase } from '@/use-cases/media.use-case';

type MediaPageProps = NextPageWithPagination;

const MediaPage = async ({ searchParams }: MediaPageProps) => {
	const { page, size } = await searchParams;
	const data = await findPaginatedMediaUseCase(
		Number(size) || 8,
		Number(page) || 1
	);

	return (
		<>
			<AdminTitle
				title='Media'
				description='Here you can manage all the media files that you have uploaded to every post.'
			>
				<UploadMediaButton />
			</AdminTitle>

			<Card>
				<CardHeader />

				<CardContent>
					<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
						{data.data.map((image, index) => (
							<ImageCard
								id={image.id}
								url={image.url}
								postCount={image.postCount}
								key={index}
							/>
						))}
					</div>

					<PaginationSuspense
						pageSizeOptions={[8, 16, 32, 64]}
						defaultPageSize={8}
					/>
				</CardContent>
			</Card>

			<UploadImageForm />
		</>
	);
};

export default MediaPage;
