import { NewPageView, postViews } from '@/drizzle/schema';
import { db, Transaction } from '@/lib/db';
import { eq } from 'drizzle-orm';

export const insertPostView = async (view: NewPageView) => {
	const response = await db.insert(postViews).values(view).returning({
		id: postViews.id,
	});

	return response[0].id;
};

export const deletePostViewsByPostId = async (
	postId: string,
	tx: Transaction | typeof db = db
) => {
	await tx.delete(postViews).where(eq(postViews.postId, postId));
};
