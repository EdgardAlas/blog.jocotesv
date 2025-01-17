import { findPostBySlug } from '@/data-acces/posts/find-post-by-slug';
import { posts } from '@/drizzle/schema';
import { db, Transaction } from '@/lib/db';
import { eq, or } from 'drizzle-orm';

export const getAllTranslationsBySlug = async (
	slug: string,
	tx: Transaction | typeof db = db
) => {
	const post = await findPostBySlug(slug);

	if (!post) {
		return null;
	}

	const translations = await tx.query.posts.findMany({
		where: or(eq(posts.id, post.id), eq(posts.parentId, post.id)),
	});

	return translations.map(
		(translation) => `/${translation.lang}/${translation.slug}`
	);
};

