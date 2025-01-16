import { findAuthorById, deleteAuthor } from '@/data-acces/authors';
import { CustomError } from '@/helpers/custom-error';

export const deleteAuthorUseCase = async (id: string) => {
	const author = await findAuthorById(id);

	if (!author) {
		throw new CustomError('Author not found');
	}

	await deleteAuthor(id);
};
