import { media, postMedia } from '@/drizzle/schema';
import { db, Transaction } from '@/lib/db';
import { desc, eq, sql } from 'drizzle-orm';

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
			publicId: media.publicId,
		})
		.from(media)
		.leftJoin(postMedia, eq(media.id, postMedia.mediaId))
		.orderBy(desc(media.id))
		.groupBy((t) => [t.id, t.url])
		.offset(pageSize * (page - 1))
		.limit(pageSize);
};
