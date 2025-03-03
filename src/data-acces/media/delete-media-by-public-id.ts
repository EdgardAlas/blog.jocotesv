import { media } from '@/drizzle/schema';
import { CustomError } from '@/helpers/custom-error';
import { db, Transaction } from '@/lib/db';
import { eq } from 'drizzle-orm';

export const deleteMediaByPublicId = async (
	publicId: string,
	tx: Transaction | typeof db = db
) => {
	const response = await tx
		.delete(media)
		.where(eq(media.publicId, publicId))
		.returning({ url: media.url });

	if (response.length === 0) {
		throw new CustomError('Media not found');
	}

	return response[0].url;
};
