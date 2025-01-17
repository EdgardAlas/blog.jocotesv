import { NewPost, posts } from '@/drizzle/schema';
import { db, Transaction } from '@/lib/db';

export const insertPost = async (
	post: NewPost,
	tx: Transaction | typeof db = db
): Promise<string> => {
	const response = await tx.insert(posts).values(post).returning({
		id: posts.id,
	});

	return response[0].id;
};
