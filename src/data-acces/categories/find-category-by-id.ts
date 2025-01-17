import { categories, NewCategory } from '@/drizzle/schema';
import { db, Transaction } from '@/lib/db';
import { eq } from 'drizzle-orm';

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
