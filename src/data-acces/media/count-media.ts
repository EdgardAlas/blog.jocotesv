import { media } from '@/drizzle/schema';
import { db, Transaction } from '@/lib/db';

export const countMedia = (tx: Transaction | typeof db = db) => {
	return tx.$count(media);
};
