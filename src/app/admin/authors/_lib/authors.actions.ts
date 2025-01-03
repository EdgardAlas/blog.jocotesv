'use server';

import {
	GetAuthorByIdSchema,
	SaveAuthorSchema,
} from '@/app/admin/authors/_lib/authors.schema';
import { authActionClient } from '@/lib/safe-action';
import {
	deleteAuthorUseCase,
	getAuthorByIdUseCase,
	insertAuthorUseCase,
} from '@/use-cases/authors.use-case';
import { updateCategoryUseCase } from '@/use-cases/categories.use-case';
import { revalidatePath } from 'next/cache';

export const saveAuthorAction = authActionClient
	.schema(SaveAuthorSchema)
	.action(async ({ parsedInput }) => {
		if (parsedInput.id) {
			await updateCategoryUseCase(parsedInput.id, parsedInput);
		} else {
			await insertAuthorUseCase(parsedInput);
		}

		revalidatePath('/admin/authors');
	});

export const getAuthorByIdAction = authActionClient
	.schema(GetAuthorByIdSchema)
	.action(async ({ parsedInput }) => {
		const author = await getAuthorByIdUseCase(parsedInput.id);
		return author;
	});

export const deleteAuthorAction = authActionClient
	.schema(GetAuthorByIdSchema)
	.action(async ({ parsedInput }) => {
		await deleteAuthorUseCase(parsedInput.id);
		revalidatePath('/admin/authors');
	});
