import { MediaItem } from '@/app/admin/media/_types/media.types';
import {
	countMedia,
	deleteMedia,
	findMediaByUrl,
	findPaginatedMedia,
	insertMedia,
} from '@/data-acces/media.data-access';
import { CustomError } from '@/helpers/custom-error';
import { formatDate } from '@/lib/format-dates';
import {
	deleteFromCloudinaryUseCase,
	uploadToCloudinaryUseCase,
} from '@/use-cases/cloudinary.use-case';

export const insertMediaUseCase = async (url: string) => {
	const findMedia = await findMediaByUrl(url);

	if (findMedia) {
		return findMedia.id;
	}

	return await insertMedia(url);
};

export const uploadMediaUseCase = async (file: File, folder: string) => {
	const url = await uploadToCloudinaryUseCase(file, folder);

	if (!url) {
		throw new CustomError('Failed to upload file');
	}

	const id = await insertMediaUseCase(url);

	return {
		id,
		url,
	};
};

export const findPaginatedMediaUseCase = async (
	pageSize: number,
	page: number
): Promise<WithPagination<MediaItem>> => {
	const [media, count] = await Promise.all([
		findPaginatedMedia(pageSize, page),
		countMedia(),
	]);

	const mappedMedia: MediaItem[] = media.map((m) => ({
		id: m.id,
		postCount: m.postCount,
		updatedAt: formatDate(m.updatedAt).format('LLL'),
		url: m.url,
	}));

	return {
		data: mappedMedia,
		totalPages: Math.ceil(count / pageSize),
	};
};

export const deleteMediaUseCase = async (id: string) => {
	const url = await deleteMedia(id);

	await deleteFromCloudinaryUseCase(url);
};
