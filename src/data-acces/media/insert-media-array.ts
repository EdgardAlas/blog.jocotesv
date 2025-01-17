import { media } from '@/drizzle/schema';
import { db, Transaction } from '@/lib/db';

export const insertMediaArray = async (
	data: string[],
	tx: Transaction | typeof db = db
) => {
	const response = await tx
		.insert(media)
		.values(
			data.map((url) => ({
				url,
			}))
		)
		.returning({
			id: media.id,
		});

	return response.map((r) => r.id);
};
