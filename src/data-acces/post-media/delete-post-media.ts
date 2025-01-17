import { postMedia } from '@/drizzle/schema';
import { db, Transaction } from '@/lib/db';
import { eq } from 'drizzle-orm';

export const deletePostMedia = (
	postId: string,
	tx: Transaction | typeof db = db
) => {
	return tx.delete(postMedia).where(eq(postMedia.postId, postId));
};

