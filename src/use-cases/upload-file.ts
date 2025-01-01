import cloudinary from '@/lib/cloudinary';
import { v4 } from 'uuid';

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
