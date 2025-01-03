import { NewPost, posts, SelectPost } from '@/drizzle/schema';
import { db, Transaction } from '@/lib/db';
import { eq, ilike, sql } from 'drizzle-orm';

export const insertPost = async (
	post: NewPost,
	tx: Transaction | typeof db = db
): Promise<string> => {
	const response = await tx.insert(posts).values(post).returning({
		id: posts.id,
	});

	return response[0].id;
};

export const findPostById = async (
	id: string,
	tx: Transaction | typeof db = db
) => {
	return tx.query.posts.findFirst({
		where: eq(posts.id, id),
		with: {
			author: true,
			postCategories: {
				with: {
					category: true,
				},
			},
		},
	});
};

export const getPaginatedPosts = async (
	page: number,
	pageSize: number,
	search: string,
	tx: Transaction | typeof db = db
): Promise<SelectPost[]> => {
	return tx.query.posts.findMany({
		limit: pageSize,
		offset: (page - 1) * pageSize,
		where: search ? ilike(posts.title, `%${search}%`) : undefined,
		with: {
			author: true,
			postCategories: {
				with: {
					category: true,
				},
			},
		},
	});
};

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

export const deletePost = async (
	id: string,
	tx: Transaction | typeof db = db
): Promise<void> => {
	await tx.delete(posts).where(eq(posts.id, id));
};

export const countPosts = async (
	search: string,
	tx: Transaction | typeof db = db
): Promise<number> => {
	const result = await tx
		.select({
			count: sql`count(*)`.mapWith(Number),
		})
		.from(posts)
		.where(search ? ilike(posts.title, `%${search}%`) : undefined);

	return result[0].count;
};

export const findPostBySlug = async (
	slug: string,
	tx: Transaction | typeof db = db
) => {
	return tx.query.posts.findFirst({
		where: eq(posts.slug, slug),
		with: {
			author: true,
			postCategories: {
				with: {
					category: true,
				},
			},
		},
	});
};
