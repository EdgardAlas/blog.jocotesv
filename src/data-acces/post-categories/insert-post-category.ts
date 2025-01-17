import { postCategories } from '@/drizzle/schema';
import { db, Transaction } from '@/lib/db';

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
