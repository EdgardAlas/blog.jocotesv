'use server';

import { GetPostSchema } from '@/app/admin/(dashboard)/posts/_lib/posts.schema';
import { roles } from '@/config/roles';
import { authActionClient } from '@/lib/safe-action';
import { deletePostUseCase } from '@/use-cases/posts';
import { revalidatePath } from 'next/cache';

export const deletePostAction = authActionClient
	.metadata([roles.admin, roles.editor])
	.schema(GetPostSchema)
	.action(async ({ parsedInput }) => {
		await deletePostUseCase(parsedInput.id);
		revalidatePath('/admin/posts');
		revalidatePath('/en');
		revalidatePath('/es');
		revalidatePath('/[locale]/(public)/[slug]', 'page');
	});
