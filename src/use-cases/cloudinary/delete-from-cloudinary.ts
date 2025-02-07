import { CustomError } from '@/helpers/custom-error';
import { env } from '@/lib/env';
import { ResponseCallback } from 'cloudinary';

const loadCloudinary = async () => {
	return import('cloudinary').then((cloudinary) => {
		cloudinary.default.v2.config({
			cloud_name: env.CLOUDINARY_CLOUD_NAME,
			api_key: env.CLOUDINARY_API_KEY,
			api_secret: env.CLOUDINARY_API_SECRET,
		});

		return cloudinary.default;
	});
};

export const deleteFromCloudinaryUseCase = async (
	publicId: string,
	cb?: ResponseCallback
) => {
	const cloudinary = await loadCloudinary();

	if (!publicId) {
		return;
	}

	return cloudinary.v2.uploader.destroy(
		publicId,
		{
			invalidate: true,
		},
		cb ||
			((e) => {
				if (e) {
					throw new CustomError("Couldn't delete file");
				}
			})
	);
};
