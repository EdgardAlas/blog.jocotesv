import 'server-only';

import cloudinary from '@/lib/cloudinary';
import { extractPublicIdFromUrl } from '@/use-cases/extract-public-id.use-case';

export const removeFile = (url: string, folder: string) => {
	return new Promise((resolve, reject) => {
		const publicId = extractPublicIdFromUrl(url, folder);

		if (!publicId) {
			return reject('Public ID not found');
		}

		cloudinary.uploader.destroy(publicId, (error, result) => {
			if (error) {
				return reject(error);
			}

			return resolve(result);
		});
	});
};
