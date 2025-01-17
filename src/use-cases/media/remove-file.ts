import 'server-only';

import { deleteFromCloudinaryUseCase } from '@/use-cases/cloudinary/cloudinary.use-case';
import { extractPublicIdFromUrl } from '@/use-cases/cloudinary/extract-public-id.use-case';

export const removeFileUseCase = (url: string, folder: string) => {
	return new Promise((resolve, reject) => {
		const publicId = extractPublicIdFromUrl(url, folder);

		if (!publicId) {
			return reject('Public ID not found');
		}

		deleteFromCloudinaryUseCase(publicId, (error, result) => {
			if (error) {
				return reject(error);
			}

			return resolve(result);
		});
	});
};
