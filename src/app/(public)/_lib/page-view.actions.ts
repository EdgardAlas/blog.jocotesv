'use server';

import { actionClient } from '@/lib/safe-action';
import { insertPageViewUseCase } from '@/use-cases/page-views.use-case';
import { z } from 'zod';

export const pageViewAction = actionClient
	.schema(z.string())
	.action(async ({ parsedInput }) => {
		await insertPageViewUseCase(parsedInput);
	});
