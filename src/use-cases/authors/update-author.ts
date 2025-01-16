import { SaveAuthorSchema } from '@/app/admin/(dashboard)/authors/_lib/authors.schema';
import { findAuthorByName, updateAuthor } from '@/data-acces/authors';
import { CustomError } from '@/helpers/custom-error';
import { z } from 'zod';

export const updateAuthorUseCase = async (
	id: string,
	data: z.infer<typeof SaveAuthorSchema>
) => {
	const author = await findAuthorByName(data.name);

	if (author && author.id !== id) {
		throw new CustomError('Author already exists');
	}

	await updateAuthor(id, {
		name: data.name,
	});
};
