import { posts } from '@/drizzle/schema';
import { db, Transaction } from '@/lib/db';
import { and, desc, eq, ilike, isNull } from 'drizzle-orm';

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
