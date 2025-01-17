import { CustomError } from '@/helpers/custom-error';
import { env } from '@/lib/env';
import { v2 as cloudinary, ResponseCallback } from 'cloudinary';

const loadCloudinary = () => {
	cloudinary.config({
		cloud_name: env.CLOUDINARY_CLOUD_NAME,
		api_key: env.CLOUDINARY_API_KEY,
		api_secret: env.CLOUDINARY_API_SECRET,
	});
};

export const deleteFromCloudinaryUseCase = async (
	publicId: string,
	cb?: ResponseCallback
) => {
	loadCloudinary();

	if (!publicId) {
		return;
	}

	return cloudinary.uploader.destroy(
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
