import { AuthorsRow } from '@/app/admin/(dashboard)/authors/_types/authors';
import { findAuthorById } from '@/data-acces/authors';
import { CustomError } from '@/helpers/custom-error';
import { formatDate } from '@/lib/format-dates';

export const findAuthorByIdUseCase = async (
	id: string
): Promise<AuthorsRow> => {
	const author = await findAuthorById(id);

	if (!author) {
		throw new CustomError('Author not found');
	}

	return {
		createdAt: formatDate(author.createdAt).format('LLL'),
		id: author?.id,
		name: author?.name,
		updatedAt: formatDate(author.updatedAt).format('LLL'),
		image: author?.image || '',
	};
};
