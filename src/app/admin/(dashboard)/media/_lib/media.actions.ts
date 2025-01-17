'use server';

import {
	GetImageById,
	UploadMediaSchema,
} from '@/app/admin/(dashboard)/media/_lib/media.schema';
import { roles } from '@/config/roles';
import { authActionClient } from '@/lib/safe-action';
import { deleteMediaUseCase } from '@/use-cases/media';
import { uploadMediaUseCase } from '@/use-cases/media/upload-media';
import { revalidatePath } from 'next/cache';

export const deleteMediaAction = authActionClient
	.metadata([roles.admin, roles.editor])
	.schema(GetImageById)
	.action(async ({ parsedInput }) => {
		await deleteMediaUseCase(parsedInput);
		revalidatePath('/admin/media');
	});

export const uploadMediaAction = authActionClient
	.metadata([roles.admin, roles.editor])
	.schema(UploadMediaSchema)
	.action(async ({ parsedInput: { folder, image } }) => {
		await uploadMediaUseCase(image, folder);
		revalidatePath('/admin/media');
	});
