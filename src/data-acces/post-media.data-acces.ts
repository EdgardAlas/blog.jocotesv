import { postMedia } from '@/drizzle/schema';
import { db, Transaction } from '@/lib/db';
import { eq } from 'drizzle-orm';

export const insertPostMediaArray = (
	mediaArray: string[],
	postId: string,
	tx: Transaction | typeof db = db
) => {
	const postMediaArray = mediaArray.map((mediaUrl) => ({
		mediaId: mediaUrl,
		postId,
	}));

	return tx.insert(postMedia).values(postMediaArray).returning({
		mediaId: postMedia.mediaId,
		postId: postMedia.postId,
	});
};

export const deletePostMedia = (
	postId: string,
	tx: Transaction | typeof db = db
) => {
	return tx.delete(postMedia).where(eq(postMedia.postId, postId));
};
