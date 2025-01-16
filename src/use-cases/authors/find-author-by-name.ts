import { findAuthorsByName } from '@/data-acces/authors';
import { CustomError } from '@/helpers/custom-error';

export const findAuthorsByNameUseCase = async (name: string) => {
	const authors = await findAuthorsByName(name);

	if (!authors) {
		throw new CustomError('Author not found');
	}

	return authors.map((author) => ({
		label: author.name,
		value: author.id,
	}));
};
