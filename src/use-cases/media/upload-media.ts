import { CustomError } from '@/helpers/custom-error';
import { uploadToCloudinaryUseCase } from '@/use-cases/cloudinary.use-case';
import { insertMediaUseCase } from '@/use-cases/media/insert-media';

export const uploadMediaUseCase = async (file: File, folder: string) => {
	const uploadedMedia = await uploadToCloudinaryUseCase(file, folder);

	if (!uploadedMedia) {
		throw new CustomError('Failed to upload file');
	}

	const id = await insertMediaUseCase(
		uploadedMedia.secureUrl as string,
		uploadedMedia.publicId as string
	);

	return {
		id,
		url: uploadedMedia,
	};
};
