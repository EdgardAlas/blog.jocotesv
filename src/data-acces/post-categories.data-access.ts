import 'server-only';

import { postCategories } from '@/drizzle/schema';
import { db, Transaction } from '@/lib/db';
import { eq } from 'drizzle-orm';

export const insertPostCategories = async (
	categories: string[],
	postId: string,
	tx: Transaction | typeof db = db
) => {
	const result = await tx
		.insert(postCategories)
		.values(
			categories.map((category) => ({
				categoryId: category,
				postId,
			}))
		)
		.returning({
			categoryId: postCategories.categoryId,
			postId: postCategories.postId,
		});

	return result;
};

export const deletePostCategories = (
	postId: string,
	tx: Transaction | typeof db = db
) => {
	return tx.delete(postCategories).where(eq(postCategories.postId, postId));
};
