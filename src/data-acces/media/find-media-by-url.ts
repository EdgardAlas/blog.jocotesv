import { media } from '@/drizzle/schema';
import { db, Transaction } from '@/lib/db';
import { eq } from 'drizzle-orm';

export const findMediaByUrl = (
	url: string,
	tx: Transaction | typeof db = db
) => {
	return tx.query.media.findFirst({
		where: eq(media.url, url),
	});
};
