import { ImageCard } from '@/app/admin/media/_containers/image-card';
import { findPaginatedMediaUseCase } from '@/use-cases/media.use-case';
import React from 'react';

export const ImageCardList = async ({
	size = 8,
	page = 1,
}: {
	size: number;
	page: number;
}) => {
	const data = await findPaginatedMediaUseCase(size, page);

	return (
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
	);
};
