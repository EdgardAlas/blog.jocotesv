import { v4 } from 'uuid';

import { env } from '@/lib/env';
import * as cloudinary from 'cloudinary';

const loadCloudinary = () => {
	cloudinary.v2.config({
		cloud_name: env.CLOUDINARY_CLOUD_NAME,
		api_key: env.CLOUDINARY_API_KEY,
		api_secret: env.CLOUDINARY_API_SECRET,
	});
};

export const uploadToCloudinaryUseCase = async (
	file: File,
	folder: string
): Promise<{
	secureUrl: string | undefined;
	publicId: string | undefined;
}> => {
	loadCloudinary();

	try {
		const arrayBuffer = await file.arrayBuffer();
		const buffer = Buffer.from(arrayBuffer);

		const uniqueFileName = v4();

		return new Promise((resolve, reject) => {
			const uploadStream = cloudinary.v2.uploader.upload_stream(
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
