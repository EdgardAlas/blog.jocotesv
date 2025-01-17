import { categories, NewCategory } from '@/drizzle/schema';
import { db, Transaction } from '@/lib/db';
import { eq } from 'drizzle-orm';

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
