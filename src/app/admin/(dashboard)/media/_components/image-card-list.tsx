import {
	ImageCard,
	ImageCardSkeleton,
} from '@/app/admin/(dashboard)/media/_components/image-card';
import { Pagination } from '@/components/pagination/pagination';
import { findPaginatedMediaUseCase } from '@/use-cases/media.use-case';

export const ImageCardList = async ({
	size = 8,
	page = 1,
}: {
	size: number;
	page: number;
}) => {
	const data = await findPaginatedMediaUseCase(size, page);

	if (data.data.length === 0) {
		return (
			<p className='mt-8 text-center text-lg text-gray-500'>No images found</p>
		);
	}

	return (
		<>
			<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
				{data.data.map((image, index) => (
					<ImageCard
						publicId={image.publicId}
						url={image.url}
						postCount={image.postCount}
						key={index}
					/>
				))}
			</div>
			<Pagination
				pageSizeOptions={[8, 16, 32, 64]}
				defaultPageSize={8}
				totalPages={data.totalPages}
			/>
		</>
	);
};

export const ImageCardSkeletonList = () => {
	return (
		<>
			<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
				{Array.from({ length: 4 }).map((_, index) => (
					<ImageCardSkeleton key={index} />
				))}
			</div>
			<Pagination
				pageSizeOptions={[8, 16, 32, 64]}
				defaultPageSize={8}
				disableButtons
			/>
		</>
	);
};
