import {
	InferInsertModel,
	InferSelectModel,
	relations,
	sql,
} from 'drizzle-orm';
import {
	boolean,
	check,
	foreignKey,
	integer,
	pgTable,
	primaryKey,
	text,
	timestamp,
	unique,
	uuid,
	varchar,
} from 'drizzle-orm/pg-core';

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
			sql`(role)::text = ANY ((ARRAY['owner'::character varying, 'admin'::character varying, 'editor'::character varying, 'user'::character varying])::text[])`
		),
	]
);

export const media = pgTable('media', {
	id: uuid().defaultRandom().primaryKey().notNull(),
	url: text().notNull(),
	createdAt: timestamp('created_at', { mode: 'string' }).default(
		sql`CURRENT_TIMESTAMP`
	),
	updatedAt: timestamp('updated_at', { mode: 'string' }).default(
		sql`CURRENT_TIMESTAMP`
	),
	publicId: text('public_id'),
});

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
		views: integer().default(0),
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

export const postMedia = pgTable(
	'post_media',
	{
		postId: uuid('post_id').notNull(),
		mediaId: uuid('media_id').notNull(),
	},
	(table) => [
		foreignKey({
			columns: [table.postId],
			foreignColumns: [posts.id],
			name: 'post_media_post_id_fkey',
		}).onDelete('cascade'),
		foreignKey({
			columns: [table.mediaId],
			foreignColumns: [media.id],
			name: 'post_media_media_id_fkey',
		}).onDelete('cascade'),
		primaryKey({
			columns: [table.postId, table.mediaId],
			name: 'post_media_pkey',
		}),
	]
);

export const postsRelations = relations(posts, ({ one, many }) => ({
	author: one(authors, {
		fields: [posts.authorId],
		references: [authors.id],
	}),
	postCategories: many(postCategories),
	postMedias: many(postMedia),
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

export const postMediaRelations = relations(postMedia, ({ one }) => ({
	post: one(posts, {
		fields: [postMedia.postId],
		references: [posts.id],
	}),
	media: one(media, {
		fields: [postMedia.mediaId],
		references: [media.id],
	}),
}));

export const mediaRelations = relations(media, ({ many }) => ({
	postMedias: many(postMedia),
}));

export type NewUser = InferInsertModel<typeof users>;
export type NewCategory = InferInsertModel<typeof categories>;
export type NewAuthor = InferInsertModel<typeof authors>;
export type NewPost = InferInsertModel<typeof posts>;
export type NewPostCategory = InferInsertModel<typeof postCategories>;
export type NewMedia = InferInsertModel<typeof media>;
export type NewPostMedia = InferInsertModel<typeof postMedia>;

export type SelectUser = InferSelectModel<typeof users>;
export type SelectCategory = InferSelectModel<typeof categories>;
export type SelectAuthor = InferSelectModel<typeof authors>;
export type SelectPost = InferSelectModel<typeof posts>;
export type SelectPostCategory = InferSelectModel<typeof postCategories>;
export type SelectPostMedia = InferSelectModel<typeof postMedia>;
export type SelectMedia = InferSelectModel<typeof media>;
