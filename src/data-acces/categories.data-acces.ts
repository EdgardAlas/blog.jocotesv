import 'server-only';

import { categories, NewCategory, SelectCategory } from '@/drizzle/schema';
import { db, Transaction } from '@/lib/db';
import { eq, ilike, sql } from 'drizzle-orm';

export const insertCategory = async (
	category: NewCategory,
	tx: Transaction | typeof db = db
): Promise<void> => {
	await tx.insert(categories).values(category);
};

export const findCategoryById = async (
	id: string,
	tx: Transaction | typeof db = db
): Promise<NewCategory | null> => {
	const result = await tx
		.select()
		.from(categories)
		.where(eq(categories.id, id));

	return result?.[0] ?? null;
};

export const getPaginatedCategories = async (
	page: number,
	pageSize: number,
	search: string,
	tx: Transaction | typeof db = db
): Promise<NewCategory[]> => {
	return tx.query.categories.findMany({
		limit: pageSize,
		offset: (page - 1) * pageSize,
		where: search ? ilike(categories.name, `%${search}%`) : undefined,
	});
};

export const updateCategory = async (
	id: string,
	category: Partial<NewCategory>,
	tx: Transaction | typeof db = db
): Promise<void> => {
	const update = await tx
		.update(categories)
		.set(category)
		.where(eq(categories.id, id))
		.returning({ id: categories.id });

	if (!update.length) {
		throw new Error('Category not found');
	}
};

export const deleteCategory = async (
	id: string,
	tx: Transaction | typeof db = db
): Promise<void> => {
	const response = await tx
		.delete(categories)
		.where(eq(categories.id, id))
		.returning({
			id: categories.id,
		});

	if (!response.length) {
		throw new Error('Category not found');
	}
};

export const countCategories = async (
	search: string,
	tx: Transaction | typeof db = db
): Promise<number> => {
	const result = await tx
		.select({
			count: sql`count(*)`.mapWith(Number),
		})
		.from(categories)
		.where(search ? ilike(categories.name, `%${search}%`) : undefined);

	return result[0].count;
};

export const findCategoriesByName = async (
	search: string,
	tx: Transaction | typeof db = db
): Promise<SelectCategory[]> => {
	if (!search) {
		return [];
	}

	return tx.query.categories.findMany({
		where: ilike(
			sql`lower(categories.name)`,
			`%${search}%`.toLocaleLowerCase()
		),
	});
};

export const findCategoryByName = async (
	search: string,
	tx: Transaction | typeof db = db
): Promise<SelectCategory | null> => {
	const result = await tx.query.categories.findFirst({
		where: ilike(sql`lower(categories.name)`, search.toLocaleLowerCase()),
	});

	return result ?? null;
};
