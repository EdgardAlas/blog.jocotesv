import {
	pgTable,
	foreignKey,
	uuid,
	timestamp,
	inet,
	text,
	unique,
	check,
	varchar,
	boolean,
	primaryKey,
} from 'drizzle-orm/pg-core';
import {
	InferInsertModel,
	InferSelectModel,
	relations,
	sql,
} from 'drizzle-orm';

export const pageViews = pgTable(
	'page_views',
	{
		id: uuid().defaultRandom().primaryKey().notNull(),
		postId: uuid('post_id'),
		viewedAt: timestamp('viewed_at', { mode: 'string' }).default(
			sql`CURRENT_TIMESTAMP`
		),
		ipAddress: inet('ip_address'),
		userAgent: text('user_agent'),
	},
	(table) => [
		foreignKey({
			columns: [table.postId],
			foreignColumns: [posts.id],
			name: 'page_views_post_id_fkey',
		}).onDelete('cascade'),
	]
);

export const users = pgTable(
	'users',
	{
		id: uuid().defaultRandom().primaryKey().notNull(),
		name: varchar({ length: 100 }).notNull(),
		email: varchar({ length: 150 }).notNull(),
		password: text().notNull(),
		role: varchar({ length: 50 }).notNull(),
		createdAt: timestamp('created_at', { mode: 'string' }).default(
			sql`CURRENT_TIMESTAMP`
		),
		updatedAt: timestamp('updated_at', { mode: 'string' }).default(
			sql`CURRENT_TIMESTAMP`
		),
	},
	(table) => [
		unique('users_email_key').on(table.email),
		check(
			'users_role_check',
			sql`(role)::text = ANY ((ARRAY['superadmin'::character varying, 'admin'::character varying, 'editor'::character varying, 'user'::character varying])::text[])`
		),
	]
);

export const categories = pgTable(
	'categories',
	{
		id: uuid().defaultRandom().primaryKey().notNull(),
		name: varchar({ length: 100 }).notNull(),
		createdAt: timestamp('created_at', { mode: 'string' }).default(
			sql`CURRENT_TIMESTAMP`
		),
		updatedAt: timestamp('updated_at', { mode: 'string' }).default(
			sql`CURRENT_TIMESTAMP`
		),
	},
	(table) => [unique('categories_name_key').on(table.name)]
);

export const authors = pgTable('authors', {
	id: uuid().defaultRandom().primaryKey().notNull(),
	name: varchar({ length: 100 }).notNull(),
	image: text(),
	createdAt: timestamp('created_at', { mode: 'string' }).default(
		sql`CURRENT_TIMESTAMP`
	),
	updatedAt: timestamp('updated_at', { mode: 'string' }).default(
		sql`CURRENT_TIMESTAMP`
	),
});

export const posts = pgTable(
	'posts',
	{
		id: uuid().defaultRandom().primaryKey().notNull(),
		title: varchar({ length: 200 }).notNull(),
		content: text().notNull(),
		featured: boolean().default(false),
		image: text(),
		description: text(),
		slug: varchar({ length: 150 }).notNull(),
		status: varchar({ length: 50 }).default('draft').notNull(),
		authorId: uuid('author_id'),
		publicationDate: timestamp('publication_date', { mode: 'string' }),
		createdAt: timestamp('created_at', { mode: 'string' }).default(
			sql`CURRENT_TIMESTAMP`
		),
		updatedAt: timestamp('updated_at', { mode: 'string' }).default(
			sql`CURRENT_TIMESTAMP`
		),
	},
	(table) => [
		foreignKey({
			columns: [table.authorId],
			foreignColumns: [authors.id],
			name: 'posts_author_id_fkey',
		}).onDelete('set null'),
		unique('posts_slug_key').on(table.slug),
		check(
			'posts_status_check',
			sql`(status)::text = ANY ((ARRAY['draft'::character varying, 'published'::character varying])::text[])`
		),
	]
);

export const postCategories = pgTable(
	'post_categories',
	{
		postId: uuid('post_id').notNull(),
		categoryId: uuid('category_id').notNull(),
	},
	(table) => [
		foreignKey({
			columns: [table.postId],
			foreignColumns: [posts.id],
			name: 'post_categories_post_id_fkey',
		}).onDelete('cascade'),
		foreignKey({
			columns: [table.categoryId],
			foreignColumns: [categories.id],
			name: 'post_categories_category_id_fkey',
		}).onDelete('cascade'),
		primaryKey({
			columns: [table.postId, table.categoryId],
			name: 'post_categories_pkey',
		}),
	]
);

export const pageViewsRelations = relations(pageViews, ({ one }) => ({
	post: one(posts, {
		fields: [pageViews.postId],
		references: [posts.id],
	}),
}));

export const postsRelations = relations(posts, ({ one, many }) => ({
	pageViews: many(pageViews),
	author: one(authors, {
		fields: [posts.authorId],
		references: [authors.id],
	}),
	postCategories: many(postCategories),
}));

export const authorsRelations = relations(authors, ({ many }) => ({
	posts: many(posts),
}));

export const postCategoriesRelations = relations(postCategories, ({ one }) => ({
	post: one(posts, {
		fields: [postCategories.postId],
		references: [posts.id],
	}),
	category: one(categories, {
		fields: [postCategories.categoryId],
		references: [categories.id],
	}),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
	postCategories: many(postCategories),
}));

// types

export type NewUser = InferInsertModel<typeof users>;
export type NewCategory = InferInsertModel<typeof categories>;
export type NewAuthor = InferInsertModel<typeof authors>;
export type NewPost = InferInsertModel<typeof posts>;
export type NewPostCategory = InferInsertModel<typeof postCategories>;
export type NewPageView = InferInsertModel<typeof pageViews>;

export type SelectUser = InferSelectModel<typeof users>;
export type SelectCategory = InferSelectModel<typeof categories>;
export type SelectAuthor = InferSelectModel<typeof authors>;
export type SelectPost = InferSelectModel<typeof posts>;
export type SelectPostCategory = InferSelectModel<typeof postCategories>;
export type SelectPageView = InferSelectModel<typeof pageViews>;
