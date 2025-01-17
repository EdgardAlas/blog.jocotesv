import { postMedia } from '@/drizzle/schema';
import { db, Transaction } from '@/lib/db';

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
