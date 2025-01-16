import { authors, NewAuthor } from '@/drizzle/schema';
import { db, Transaction } from '@/lib/db';
import { eq } from 'drizzle-orm';

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
