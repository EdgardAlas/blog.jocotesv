'use server';

import { GetPostByIdSchema } from '@/app/admin/(dashboard)/posts/_lib/posts.schema';
import { roles } from '@/lib/current-user';
import { authActionClient } from '@/lib/safe-action';
import { deletePostUseCase } from '@/use-cases/post.use-case';
import { revalidatePath } from 'next/cache';

export const deletePostAction = authActionClient
	.metadata([roles.admin, roles.editor])
	.schema(GetPostByIdSchema)
	.action(async ({ parsedInput }) => {
		await deletePostUseCase(parsedInput);
		revalidatePath('/admin/posts');
	});
