import { SaveAuthorSchema } from '@/app/admin/(dashboard)/authors/_lib/authors.schema';
import { findAuthorByName, insertAuthor } from '@/data-acces/authors';
import { CustomError } from '@/helpers/custom-error';
import { z } from 'zod';

export const insertAuthorUseCase = async (
	author: Omit<z.infer<typeof SaveAuthorSchema>, 'id'>
) => {
	const findAuthor = await findAuthorByName(author.name);

	if (findAuthor) {
		throw new CustomError('Author already exists');
	}

	return insertAuthor({
		name: author.name,
	});
};
