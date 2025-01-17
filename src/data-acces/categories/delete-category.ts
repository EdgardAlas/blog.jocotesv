import { categories } from '@/drizzle/schema';
import { db, Transaction } from '@/lib/db';
import { eq } from 'drizzle-orm';

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
