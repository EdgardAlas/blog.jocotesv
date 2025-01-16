import 'server-only';

import { NewPost, posts } from '@/drizzle/schema';
import { db, Transaction } from '@/lib/db';
import { and, desc, eq, ilike, isNull, or, sql } from 'drizzle-orm';

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

export const findAdminPaginatedPosts = async (
	page: number,
	pageSize: number,
	{ search, status }: { search: string; status: string } = {
		search: '',
		status: '',
	},
	tx: Transaction | typeof db = db
) => {
	return tx.query.posts.findMany({
		limit: pageSize,
		offset: (page - 1) * pageSize,
		columns: {
			id: true,
			title: true,
			slug: true,
			status: true,
			image: true,
			publicationDate: true,
			featured: true,
			updatedAt: true,
		},
		extras(fields, { sql }) {
			return {
				shortDescription: sql<string>`
							CASE 
								WHEN LENGTH(${fields.description}) > 30 
								THEN CONCAT(SUBSTRING(${fields.description} FROM 1 FOR 30), '...')
								ELSE ${fields.description}
							END
				`.as('shortDescription'),
			};
		},
		where: and(
			search ? ilike(posts.title, `%${search}%`) : undefined,
			status ? eq(posts.status, status) : undefined,
			isNull(posts.parentId)
		),
		orderBy: desc(posts.updatedAt),
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

export const findPaginatedPublicatedPosts = async (
	page: number,
	pageSize: number,
	search: string,
	locale: string,
	tx: Transaction | typeof db = db
) => {
	return tx.query.posts.findMany({
		limit: pageSize,
		offset: (page - 1) * pageSize,
		columns: {
			id: true,
			title: true,
			slug: true,
			status: true,
			image: true,
			publicationDate: true,
			featured: true,
			updatedAt: true,
			lang: true,
		},
		extras(fields, { sql }) {
			return {
				shortDescription: sql<string>`
							CASE 
								WHEN LENGTH(${fields.description}) > 30 
								THEN CONCAT(SUBSTRING(${fields.description} FROM 1 FOR 30), '...')
								ELSE ${fields.description}
							END
				`.as('shortDescription'),
			};
		},
		where: and(
			search ? ilike(posts.title, `%${search}%`) : undefined,
			eq(posts.status, 'published'),
			eq(posts.lang, locale)
		),
		orderBy: desc(posts.updatedAt),
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
	{ search, status }: { search: string; status: string } = {
		search: '',
		status: '',
	},
	tx: Transaction | typeof db = db
): Promise<number> => {
	const result = await tx
		.select({
			count: sql`count(*)`.mapWith(Number),
		})
		.from(posts)
		.where(
			and(
				search ? ilike(posts.title, `%${search}%`) : undefined,
				status ? eq(posts.status, status) : undefined
			)
		);

	return result[0].count;
};

export const countPublicatedPosts = async (
	search: string,
	tx: Transaction | typeof db = db
): Promise<number> => {
	const result = await tx
		.select({
			count: sql`count(*)`.mapWith(Number),
		})
		.from(posts)
		.where(
			and(
				eq(posts.status, 'published'),
				search ? ilike(posts.title, `%${search}%`) : undefined
			)
		);

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

export const findLangPostBySlug = async (
	slug: string,
	lang: string,
	tx: Transaction | typeof db = db
) => {
	const post = await findPostBySlug(slug);

	if (!post) {
		return null;
	}

	const langPost = await tx.query.posts.findFirst({
		where: and(eq(posts.parentId, post.id), eq(posts.lang, lang)),
		with: {
			author: true,
			postCategories: {
				with: {
					category: true,
				},
			},
		},
	});

	return {
		post,
		langPost,
	};
};

export const existsSlug = (slug: string, tx: Transaction | typeof db = db) => {
	return tx.query.posts.findFirst({
		columns: {
			slug: true,
			id: true,
		},
		where: ilike(posts.slug, slug),
	});
};

export const findRecentPosts = async (
	count: number,
	locale: string,
	tx: Transaction | typeof db = db
) => {
	return tx.query.posts.findMany({
		limit: count,
		columns: {
			id: true,
			title: true,
			slug: true,
			status: true,
			image: true,
			publicationDate: true,
			featured: true,
			updatedAt: true,
			lang: true,
		},
		orderBy: desc(posts.publicationDate),
		where: and(eq(posts.status, 'published'), eq(posts.lang, locale)),
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

export const findFeaturedPosts = async (
	count: number,
	locale: string,
	tx: Transaction | typeof db = db
) => {
	return tx.query.posts.findMany({
		limit: count,
		columns: {
			id: true,
			title: true,
			slug: true,
			status: true,
			image: true,
			publicationDate: true,
			featured: true,
			updatedAt: true,
			lang: true,
		},
		orderBy: desc(posts.publicationDate),
		where: and(
			eq(posts.status, 'published'),
			eq(posts.featured, true),
			eq(posts.lang, locale)
		),
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

export const findPublishedPostBySlug = async (
	slug: string,
	tx: Transaction | typeof db = db
) => {
	const foundPost = await tx.query.posts.findFirst({
		where: and(eq(posts.slug, slug), eq(posts.status, 'published')),
		with: {
			author: true,
			postCategories: {
				with: {
					category: true,
				},
			},
		},
	});

	if (!foundPost) {
		return null;
	}

	const parentId = foundPost?.parentId || foundPost?.id;

	const relatedPosts = await tx.query.posts.findMany({
		where: and(
			eq(posts.status, 'published'),
			or(
				eq(posts.id, parentId as string),
				eq(posts.parentId, parentId as string)
			)
		),
		columns: {
			slug: true,
			id: true,
			parentId: true,
			lang: true,
		},
	});

	return {
		...foundPost,
		relatedPosts,
	};
};

export const addPostView = async (
	slug: string,
	tx: Transaction | typeof db = db
) => {
	const response = await tx
		.update(posts)
		.set({
			views: sql`${posts.views} + 1`,
		})
		.where(eq(posts.slug, slug))
		.returning({
			views: posts.views,
		});

	return response[0].views;
};

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
