'use server';

import {
	GenerateSlugSchema,
	removeFileSchema,
	SavePostSchema,
	uploadFileSchema,
} from '@/app/admin/(dashboard)/post/_lib/post.schema';
import { roles } from '@/config/roles';
import { authActionClient } from '@/lib/safe-action';
import { uploadToCloudinaryUseCase } from '@/use-cases/cloudinary.use-case';
import { insertMediaUseCase } from '@/use-cases/media.use-case';
import {
	generateSlugUseCase,
	insertPostUseCase,
	isSlugAvailableUseCase,
	updatePostUseCase,
} from '@/use-cases/post.use-case';
import { removeFileUseCase } from '@/use-cases/remove-file.use-case';
import { revalidatePath } from 'next/cache';
import slugify from 'slugify';

const POST_IMAGE_FOLDER = 'post-seo-images';
const POST_CONTENT_IMAGE_FOLDER = 'post-content-images';

export const uploadPostSeoImageAction = authActionClient
	.metadata([roles.admin, roles.editor])
	.schema(uploadFileSchema)
	.action(async ({ parsedInput: { file } }) => {
		const url = await uploadToCloudinaryUseCase(file, POST_IMAGE_FOLDER);
		return url.secureUrl;
	});

export const removePostSeoImageAction = authActionClient
	.metadata([roles.admin, roles.editor])
	.schema(removeFileSchema)
	.action(async ({ parsedInput: { url } }) => {
		await removeFileUseCase(url, POST_IMAGE_FOLDER);
	});

export const uploadPostContentImageAction = authActionClient
	.metadata([roles.admin, roles.editor])
	.schema(uploadFileSchema)
	.action(async ({ parsedInput: { file } }) => {
		const uploadedMedia = await uploadToCloudinaryUseCase(
			file,
			POST_CONTENT_IMAGE_FOLDER
		);
		let id = '';

		if (uploadedMedia) {
			id = await insertMediaUseCase(
				uploadedMedia.secureUrl as string,
				uploadedMedia.publicId as string
			);
		}

		return {
			id,
			url: uploadedMedia,
		};
	});

export const removePostContentImageAction = authActionClient
	.metadata([roles.admin, roles.editor])
	.schema(removeFileSchema)
	.action(async ({ parsedInput: { url } }) => {
		await removeFileUseCase(url, POST_CONTENT_IMAGE_FOLDER);
	});

export const savePostAction = authActionClient
	.metadata([roles.admin, roles.editor])
	.schema(SavePostSchema)
	.action(async ({ parsedInput }) => {
		if (parsedInput.id) {
			await updatePostUseCase(parsedInput.id, parsedInput);
		} else {
			await insertPostUseCase(parsedInput);
		}
		revalidatePath('/admin/posts');
	});

export const generateSlugAction = authActionClient
	.metadata([roles.admin, roles.editor])
	.schema(GenerateSlugSchema)
	.action(async ({ parsedInput: { title, id } }) => {
		const slug = slugify(title, { lower: true });

		const isValidSlug = await isSlugAvailableUseCase(slug, id);

		if (isValidSlug) {
			return slug;
		}

		return generateSlugUseCase(slug);
	});
