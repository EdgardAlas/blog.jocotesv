'use server';

import { actionClient } from '@/lib/safe-action';
import { addPostViewUseCase } from '@/use-cases/posts';
import { z } from 'zod';

export const postView = actionClient
	.schema(z.string())
	.action(async ({ parsedInput }) => {
		await addPostViewUseCase(parsedInput);
	});
