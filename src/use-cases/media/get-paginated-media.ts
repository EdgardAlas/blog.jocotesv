import { MediaItem } from '@/app/admin/(dashboard)/media/_types/media.types';
import { findPaginatedMedia, countMedia } from '@/data-acces/media';
import { calculateTotalPages } from '@/helpers/calculate-total-pages';
import { formatDate } from '@/lib/format-dates';

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

