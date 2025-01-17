import { posts } from '@/drizzle/schema';
import { db, Transaction } from '@/lib/db';
import { and, desc, eq, ilike } from 'drizzle-orm';

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
