import { categories, NewCategory, SelectCategory } from '@/drizzle/schema';
import { db, Transaction } from '@/lib/db';
import { eq, ilike, sql } from 'drizzle-orm';

export const insertCategory = async (
	category: NewCategory,
	tx: Transaction | typeof db = db
): Promise<void> => {
	await tx.insert(categories).values(category);
};

export const getCategoryById = async (
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
		where: search
			? ilike(sql`lower(categories.name)`, `%${search}%`.toLocaleLowerCase())
			: undefined,
	});
};

export const updateCategory = async (
	id: string,
	category: Partial<NewCategory>,
	tx: Transaction | typeof db = db
): Promise<void> => {
	await tx.update(categories).set(category).where(eq(categories.id, id));
};

export const deleteCategory = async (
	id: string,
	tx: Transaction | typeof db = db
): Promise<void> => {
	await tx.delete(categories).where(eq(categories.id, id));
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
		.where(
			search
				? ilike(sql`lower(categories.name)`, `%${search}%`.toLocaleLowerCase())
				: undefined
		);

	return result[0].count;
};

export const getCategoriesByName = async (
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
