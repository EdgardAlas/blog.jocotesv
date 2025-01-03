import { SaveAuthorSchema } from '@/app/admin/authors/_lib/authors.schema';
import {
	countAuthors,
	deleteAuthor,
	getAuthorById,
	getPaginatedAuthors,
	insertAuthor,
	updateAuthor,
} from '@/data-acces/authors.data-acces';
import { CustomError } from '@/helpers/custom-error';
import { formatDate } from '@/lib/format-dates';
import { AuthorsRow } from '@/types/authors';
import { z } from 'zod';

export const insertAuthorUseCase = (
	author: Omit<z.infer<typeof SaveAuthorSchema>, 'id'>
) => {
	return insertAuthor({
		name: author.name,
	});
};

export const getAuthorByIdUseCase = async (id: string): Promise<AuthorsRow> => {
	const author = await getAuthorById(id);

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

export const updateAuthorUseCase = async (
	id: string,
	data: z.infer<typeof SaveAuthorSchema>
) => {
	const author = await getAuthorById(id);

	if (!author) {
		throw new CustomError('Author not found');
	}

	await updateAuthor(id, {
		name: data.name,
	});
};

export const getPaginatedAuthorsUseCase = async (
	page: number,
	pageSize: number,
	search: string
): Promise<WithPagination<AuthorsRow>> => {
	const [authors, count] = await Promise.all([
		getPaginatedAuthors(page, pageSize, search),
		countAuthors(search),
	]);

	const mappedAuthors = authors.map((author) => ({
		createdAt: formatDate(author.createdAt).format('LLL'),
		id: author.id,
		name: author.name,
		updatedAt: formatDate(author.updatedAt).format('LLL'),
		image: author.image || '',
	}));

	return {
		data: mappedAuthors,
		totalPages: Math.ceil(count / pageSize),
	};
};

export const deleteAuthorUseCase = async (id: string) => {
	const author = await getAuthorById(id);

	if (!author) {
		throw new CustomError('Author not found');
	}

	await deleteAuthor(id);
};
