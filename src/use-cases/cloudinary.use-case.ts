import 'server-only';
import { v4 } from 'uuid';

import { v2 as cloudinary, ResponseCallback } from 'cloudinary';
import { env } from '@/lib/env';
import { CustomError } from '@/helpers/custom-error';

cloudinary.config({
	cloud_name: env.CLOUDINARY_CLOUD_NAME,
	api_key: env.CLOUDINARY_API_KEY,
	api_secret: env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinaryUseCase = async (
	file: File,
	folder: string
): Promise<{
	secureUrl: string | undefined;
	publicId: string | undefined;
}> => {
	try {
		const arrayBuffer = await file.arrayBuffer();
		const buffer = Buffer.from(arrayBuffer);

		const uniqueFileName = v4();

		return new Promise((resolve, reject) => {
			const uploadStream = cloudinary.uploader.upload_stream(
				{
					folder,
					public_id: uniqueFileName,
					resource_type: 'auto',
				},
				(error, result) => {
					if (error) {
						return reject(error);
					}
					return resolve({
						secureUrl: result?.secure_url,
						publicId: result?.public_id,
					});
				}
			);

			uploadStream.end(buffer);
		});
	} catch (error) {
		return Promise.reject(error);
	}
};

export const deleteFromCloudinaryUseCase = async (
	publicId: string,
	cb?: ResponseCallback
) => {
	if (!publicId) {
		return;
	}

	return cloudinary.uploader.destroy(
		publicId,
		cb ||
			((e) => {
				if (e) {
					throw new CustomError("Couldn't delete file");
				}
			})
	);
};
