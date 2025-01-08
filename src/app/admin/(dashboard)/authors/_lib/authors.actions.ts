'use server';

import {
	GetAuthorByIdSchema,
	SaveAuthorSchema,
	SearchAuthorsByNameSchema,
} from '@/app/admin/(dashboard)/authors/_lib/authors.schema';
import { roles } from '@/lib/current-user';
import { authActionClient } from '@/lib/safe-action';
import {
	deleteAuthorUseCase,
	findAuthorByIdUseCase,
	findAuthorsByNameUseCase,
	insertAuthorUseCase,
	updateAuthorUseCase,
} from '@/use-cases/authors.use-case';
import { revalidatePath } from 'next/cache';

export const saveAuthorAction = authActionClient
	.metadata([roles.admin, roles.editor])
	.schema(SaveAuthorSchema)
	.action(async ({ parsedInput }) => {
		if (parsedInput.id) {
			await updateAuthorUseCase(parsedInput.id, parsedInput);
		} else {
			await insertAuthorUseCase(parsedInput);
		}

		revalidatePath('/admin/authors');
	});

export const getAuthorByIdAction = authActionClient
	.metadata([roles.admin, roles.editor])
	.schema(GetAuthorByIdSchema)
	.action(async ({ parsedInput }) => {
		const author = await findAuthorByIdUseCase(parsedInput);
		return author;
	});

export const deleteAuthorAction = authActionClient
	.metadata([roles.admin, roles.editor])
	.schema(GetAuthorByIdSchema)
	.action(async ({ parsedInput }) => {
		await deleteAuthorUseCase(parsedInput);
		revalidatePath('/admin/authors');
	});

export const autoCompleteAuthorsByNameAction = authActionClient
	.metadata([roles.admin, roles.editor])
	.schema(SearchAuthorsByNameSchema)
	.action(async ({ parsedInput }) => {
		const authors = await findAuthorsByNameUseCase(parsedInput);
		return authors;
	});
