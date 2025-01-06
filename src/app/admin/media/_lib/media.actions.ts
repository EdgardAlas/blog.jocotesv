'use server';

import {
	GetImageById,
	UploadMediaSchema,
} from '@/app/admin/media/_lib/media.schema';
import { authActionClient } from '@/lib/safe-action';
import {
	deleteMediaUseCase,
	uploadMediaUseCase,
} from '@/use-cases/media.use-case';
import { revalidatePath } from 'next/cache';

export const deleteMediaAction = authActionClient
	.schema(GetImageById)
	.action(async ({ parsedInput }) => {
		await deleteMediaUseCase(parsedInput);
		revalidatePath('/admin/media');
	});

export const uploadMediaAction = authActionClient
	.schema(UploadMediaSchema)
	.action(async ({ parsedInput: { folder, image } }) => {
		await uploadMediaUseCase(image, folder);
		revalidatePath('/admin/media');
	});
