import { findMediaByUrl, insertMedia } from '@/data-acces/media.data-access';

export const insertMediaUseCase = async (url: string) => {
	const findMedia = await findMediaByUrl(url);

	if (findMedia) {
		return findMedia.id;
	}

	return await insertMedia(url);
};
