import { NewPageView, pageViews } from '@/drizzle/schema';
import { db, Transaction } from '@/lib/db';
import { eq } from 'drizzle-orm';

export const insertPostView = async (view: NewPageView) => {
	const response = await db.insert(pageViews).values(view).returning({
		id: pageViews.id,
	});

	return response[0].id;
};

export const deletePageViewsByPostId = async (
	postId: string,
	tx: Transaction | typeof db = db
) => {
	await tx.delete(pageViews).where(eq(pageViews.postId, postId));
};
