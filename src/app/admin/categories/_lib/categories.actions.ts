'use server';

import {
	GetCategoryByIdSchema,
	SaveCategorySchema,
} from '@/app/admin/categories/_lib/categories.schema';
import { authActionClient } from '@/lib/safe-action';
import {
	deleteCategoryUseCase,
	getCategoryByIdUseCase,
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
		const category = await getCategoryByIdUseCase(parsedInput.id);
		return category;
	});

export const deleteCategoryAction = authActionClient
	.schema(GetCategoryByIdSchema)
	.action(async ({ parsedInput }) => {
		await deleteCategoryUseCase(parsedInput.id);
		revalidatePath('/admin/categories');
	});
