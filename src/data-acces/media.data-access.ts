import { media, postMedia } from '@/drizzle/schema';
import { CustomError } from '@/helpers/custom-error';
import { db, Transaction } from '@/lib/db';
import { asc, eq, sql } from 'drizzle-orm';

export const insertMedia = async (
	data: string,
	tx: Transaction | typeof db = db
) => {
	const response = await tx
		.insert(media)
		.values({
			url: data,
		})
		.returning({
			id: media.id,
		});

	return response[0].id;
};

export const findMediaByUrl = (
	url: string,
	tx: Transaction | typeof db = db
) => {
	return tx.query.media.findFirst({
		where: eq(media.url, url),
	});
};

export const insertMediaArray = async (
	data: string[],
	tx: Transaction | typeof db = db
) => {
	const response = await tx
		.insert(media)
		.values(
			data.map((url) => ({
				url,
			}))
		)
		.returning({
			id: media.id,
		});

	return response.map((r) => r.id);
};

export const findPaginatedMedia = (
	pageSize: number,
	page: number,
	tx: Transaction | typeof db = db
) => {
	return tx
		.select({
			id: media.id,
			updatedAt: media.updatedAt,
			url: media.url,
			postCount: sql`COUNT(${postMedia.postId})`.mapWith(Number),
		})
		.from(media)
		.leftJoin(postMedia, eq(media.id, postMedia.mediaId))
		.orderBy(asc(media.id))
		.groupBy((t) => [t.id, t.url])
		.offset(pageSize * (page - 1))
		.limit(pageSize);
};

export const countMedia = async (tx: Transaction | typeof db = db) => {
	const response = await tx
		.select({
			count: sql`COUNT(*)`.mapWith(Number),
		})
		.from(media);

	return response[0].count;
};

export const deleteMedia = async (
	id: string,
	tx: Transaction | typeof db = db
) => {
	const response = await tx
		.delete(media)
		.where(eq(media.id, id))
		.returning({ url: media.url });

	if (response.length === 0) {
		throw new CustomError('Media not found');
	}

	return response[0].url;
};
