import { authors, NewAuthor, SelectAuthor } from '@/drizzle/schema';
import { db, Transaction } from '@/lib/db';
import { eq, ilike, sql } from 'drizzle-orm';

export const insertAuthor = async (
	author: NewAuthor,
	tx: Transaction | typeof db = db
): Promise<string> => {
	const result = await tx.insert(authors).values(author).returning({
		id: authors.id,
	});
	return result?.[0].id;
};

export const findAuthorById = async (
	id: string,
	tx: Transaction | typeof db = db
): Promise<SelectAuthor | null> => {
	const result = await tx.select().from(authors).where(eq(authors.id, id));
	return result?.[0] ?? null;
};

export const getPaginatedAuthors = async (
	page: number,
	pageSize: number,
	search: string,
	tx: Transaction | typeof db = db
): Promise<SelectAuthor[]> => {
	return tx.query.authors.findMany({
		limit: pageSize,
		offset: (page - 1) * pageSize,
		where: search ? ilike(authors.name, `%${search}%`) : undefined,
	});
};

export const updateAuthor = async (
	id: string,
	author: Partial<NewAuthor>,
	tx: Transaction | typeof db = db
): Promise<void> => {
	const response = await tx
		.update(authors)
		.set(author)
		.where(eq(authors.id, id))
		.returning({ id: authors.id });

	if (!response.length) {
		throw new Error('Author not found');
	}
};

export const deleteAuthor = async (
	id: string,
	tx: Transaction | typeof db = db
): Promise<void> => {
	await tx.delete(authors).where(eq(authors.id, id));
};

export const countAuthors = async (
	search: string,
	tx: Transaction | typeof db = db
): Promise<number> => {
	const result = await tx
		.select({
			count: sql`count(*)`.mapWith(Number),
		})
		.from(authors)
		.where(search ? ilike(authors.name, `%${search}%`) : undefined);

	return result[0].count;
};

export const findAuthorsByName = async (
	search: string,
	tx: Transaction | typeof db = db
): Promise<SelectAuthor[]> => {
	if (!search) {
		return [];
	}

	return tx.query.authors.findMany({
		where: ilike(authors.name, `%${search}%`),
	});
};

export const findAuthorByName = async (
	name: string,
	tx: Transaction | typeof db = db
): Promise<SelectAuthor | null> => {
	const result = await tx.query.authors.findFirst({
		where: ilike(authors.name, name.toLowerCase()),
	});
	return result ?? null;
};
