import { findMediaByUrl, insertMedia } from '@/data-acces/media';

export const insertMediaUseCase = async (url: string, publicId: string) => {
	const findMedia = await findMediaByUrl(url);

	if (findMedia) {
		return findMedia.id;
	}

	return await insertMedia({
		url,
		publicId,
	});
};

