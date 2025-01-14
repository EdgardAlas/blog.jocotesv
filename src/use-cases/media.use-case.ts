import 'server-only';

import { MediaItem } from '@/app/admin/(dashboard)/media/_types/media.types';
import {
	countMedia,
	deleteMediaByPublicId,
	findMediaByUrl,
	findPaginatedMedia,
	insertMedia,
} from '@/data-acces/media.data-access';
import { calculateTotalPages } from '@/helpers/calculate-total-pages';
import { CustomError } from '@/helpers/custom-error';
import { db } from '@/lib/db';
import { formatDate } from '@/lib/format-dates';
import {
	deleteFromCloudinaryUseCase,
	uploadToCloudinaryUseCase,
} from '@/use-cases/cloudinary.use-case';

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

export const uploadMediaUseCase = async (file: File, folder: string) => {
	const uploadedMedia = await uploadToCloudinaryUseCase(file, folder);

	if (!uploadedMedia) {
		throw new CustomError('Failed to upload file');
	}

	const id = await insertMediaUseCase(
		uploadedMedia.secureUrl as string,
		uploadedMedia.publicId as string
	);

	return {
		id,
		url: uploadedMedia,
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
		publicId: m.publicId as string,
		url: m.url,
	}));

	return {
		data: mappedMedia,
		totalPages: calculateTotalPages(count, pageSize),
	};
};

export const deleteMediaUseCase = async (id: string) => {
	await db.transaction(async (trx) => {
		await deleteMediaByPublicId(id, trx);

		if (!id) {
			throw new CustomError('Public ID not found');
		}

		await deleteFromCloudinaryUseCase(id);
	});
};
