import { NewPost, posts } from '@/drizzle/schema';
import { db, Transaction } from '@/lib/db';
import { eq } from 'drizzle-orm';

export const updatePost = async (
	id: string,
	post: Partial<NewPost>,
	tx: Transaction | typeof db = db
): Promise<string> => {
	const response = await tx
		.update(posts)
		.set(post)
		.where(eq(posts.id, id))
		.returning({ id: posts.id });

	if (!response.length) {
		throw new Error('Post not found');
	}

	return response[0].id;
};
