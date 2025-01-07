'use server';

import { GetPostByIdSchema } from '@/app/admin/posts/_lib/posts.schema';
import { authActionClient } from '@/lib/safe-action';
import { deletePostUseCase } from '@/use-cases/post.use-case';
import { revalidatePath } from 'next/cache';

export const deletePostAction = authActionClient
	.schema(GetPostByIdSchema)
	.action(async ({ parsedInput }) => {
		await deletePostUseCase(parsedInput);
		revalidatePath('/admin/posts');
	});

