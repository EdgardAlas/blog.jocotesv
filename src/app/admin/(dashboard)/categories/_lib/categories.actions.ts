'use server';

import {
	GetCategoryByIdSchema,
	SaveCategorySchema,
	SearchCategoriesByNameSchema,
} from '@/app/admin/(dashboard)/categories/_lib/categories.schema';
import { roles } from '@/lib/current-user';
import { authActionClient } from '@/lib/safe-action';
import {
	deleteCategoryUseCase,
	findCategoriesByNameUseCase,
	findCategoryByIdUseCase,
	insertCategoryUseCase,
	updateCategoryUseCase,
} from '@/use-cases/categories.use-case';
import { revalidatePath } from 'next/cache';

export const saveCategoryAction = authActionClient
	.metadata([roles.admin, roles.editor])
	.schema(SaveCategorySchema)
	.action(async ({ parsedInput }) => {
		if (parsedInput.id) {
			await updateCategoryUseCase(parsedInput.id, parsedInput);
		} else {
			await insertCategoryUseCase(parsedInput);
		}

		revalidatePath('/admin/categories');
	});

export const getCategoryByIdAction = authActionClient
	.metadata([roles.admin, roles.editor])
	.schema(GetCategoryByIdSchema)
	.action(async ({ parsedInput }) => {
		const category = await findCategoryByIdUseCase(parsedInput);
		return category;
	});

export const deleteCategoryAction = authActionClient
	.metadata([roles.admin, roles.editor])
	.schema(GetCategoryByIdSchema)
	.action(async ({ parsedInput }) => {
		await deleteCategoryUseCase(parsedInput);
		revalidatePath('/admin/categories');
	});

export const autoCompleteCategoriesByNameAction = authActionClient
	.metadata([roles.admin, roles.editor])
	.schema(SearchCategoriesByNameSchema)
	.action(async ({ parsedInput }) => {
		const categories = await findCategoriesByNameUseCase(parsedInput);
		return categories;
	});
