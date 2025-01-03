import { media } from '@/drizzle/schema';
import { db, Transaction } from '@/lib/db';
import { eq } from 'drizzle-orm';

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
