import { deleteMediaByPublicId } from '@/data-acces/media';
import { CustomError } from '@/helpers/custom-error';
import { db } from '@/lib/db';
import { deleteFromCloudinaryUseCase } from '@/use-cases/cloudinary.use-case';

export const deleteMediaUseCase = async (id: string) => {
	await db.transaction(async (trx) => {
		await deleteMediaByPublicId(id, trx);

		if (!id) {
			throw new CustomError('Public ID not found');
		}

		await deleteFromCloudinaryUseCase(id);
	});
};
