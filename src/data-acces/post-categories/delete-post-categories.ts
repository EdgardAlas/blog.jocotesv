import { postCategories } from '@/drizzle/schema';
import { db, Transaction } from '@/lib/db';
import { eq } from 'drizzle-orm';

export const deletePostCategories = (
	postId: string,
	tx: Transaction | typeof db = db
) => {
	return tx.delete(postCategories).where(eq(postCategories.postId, postId));
};

