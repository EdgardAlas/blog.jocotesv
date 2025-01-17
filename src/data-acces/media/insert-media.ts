import { media } from '@/drizzle/schema';
import { db, Transaction } from '@/lib/db';

export const insertMedia = async (
	data: {
		url: string;
		publicId: string;
	},
	tx: Transaction | typeof db = db
) => {
	const response = await tx
		.insert(media)
		.values({
			url: data.url,
			publicId: data.publicId,
		})
		.returning({
			id: media.id,
		});

	return response[0].id;
};
