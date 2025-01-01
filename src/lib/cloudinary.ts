import { env } from '@/lib/env';
import { v2 as cloudinary } from 'cloudinary';
import { v4 } from 'uuid';

cloudinary.config({
	cloud_name: env.CLOUDINARY_CLOUD_NAME,
	api_key: env.CLOUDINARY_API_KEY,
	api_secret: env.CLOUDINARY_API_SECRET,
});

export const uploadFile = async (
	file: File,
	folder: string
): Promise<string | undefined> => {
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
					return resolve(result?.secure_url);
				}
			);

			uploadStream.end(buffer);
		});
	} catch (error) {
		return Promise.reject(error);
	}
};

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

export const extractPublicIdFromUrl = (url: string, folder: string) => {
	try {
		const splittedUrl = url.split(`/${folder}/`);
		const publicId = splittedUrl?.[1]?.split('.')?.[0];

		if (!publicId) {
			return null;
		}

		return `${folder}/${publicId}`;

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (error) {
		return null;
	}
};
