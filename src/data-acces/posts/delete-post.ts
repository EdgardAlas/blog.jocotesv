import { posts } from '@/drizzle/schema';
import { db, Transaction } from '@/lib/db';
import { eq, or } from 'drizzle-orm';

export const deletePost = async (
	id: string,
	tx: Transaction | typeof db = db
): Promise<void> => {
	await tx.delete(posts).where(or(eq(posts.id, id), eq(posts.parentId, id)));
};
