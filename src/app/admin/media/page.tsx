import {
	ImageCardList,
	ImageCardSkeletonList,
} from '@/app/admin/media/_containers/image-card-list';
import { UploadImageForm } from '@/app/admin/media/_containers/upload-image-form';
import { UploadMediaButton } from '@/app/admin/media/_containers/upload-media-button';
import { PaginationSuspense } from '@/components/pagination/pagination-suspense';
import { AdminTitle } from '@/components/ui/admin-title';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Suspense } from 'react';

type MediaPageProps = NextPageWithPagination;

const MediaPage = async ({ searchParams }: MediaPageProps) => {
	const { page, size } = await searchParams;

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
					<Suspense fallback={<ImageCardSkeletonList />}>
						<ImageCardList size={Number(size) || 8} page={Number(page) || 1} />
					</Suspense>

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
