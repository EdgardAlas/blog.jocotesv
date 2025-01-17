import { deletePostCategories } from '@/data-acces/post-categories';
import { deletePostMedia } from '@/data-acces/post-media';
import { deletePost } from '@/data-acces/posts';
import { db } from '@/lib/db';

export const deletePostUseCase = (postId: string) => {
	return db.transaction(async (tx) => {
		await Promise.all([
			await deletePostCategories(postId, tx),
			await deletePostMedia(postId, tx),
		]);
		await deletePost(postId, tx);
	});
};
