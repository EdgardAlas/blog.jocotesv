'use server';

import {
	GetCategoryByIdSchema,
	SaveCategorySchema,
	SearchCategoriesByNameSchema,
} from '@/app/admin/categories/_lib/categories.schema';
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
	.schema(GetCategoryByIdSchema)
	.action(async ({ parsedInput }) => {
		const category = await findCategoryByIdUseCase(parsedInput);
		return category;
	});

export const deleteCategoryAction = authActionClient
	.schema(GetCategoryByIdSchema)
	.action(async ({ parsedInput }) => {
		await deleteCategoryUseCase(parsedInput);
		revalidatePath('/admin/categories');
	});

export const autoCompleteCategoriesByNameAction = authActionClient
	.schema(SearchCategoriesByNameSchema)
	.action(async ({ parsedInput }) => {
		const categories = await findCategoriesByNameUseCase(parsedInput);
		return categories;
	});
