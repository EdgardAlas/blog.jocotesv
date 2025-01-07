import 'server-only';

import { SaveAuthorSchema } from '@/app/admin/authors/_lib/authors.schema';
import { AuthorsRow } from '@/app/admin/authors/_types/authors';
import {
	countAuthors,
	deleteAuthor,
	findAuthorById,
	findAuthorByName,
	findAuthorsByName,
	getPaginatedAuthors,
	insertAuthor,
	updateAuthor,
} from '@/data-acces/authors.data-acces';
import { calculateTotalPages } from '@/helpers/calculate-total-pages';
import { CustomError } from '@/helpers/custom-error';
import { formatDate } from '@/lib/format-dates';
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

export const getPaginatedAuthorsUseCase = async (
	page: number,
	pageSize: number,
	search: string
): Promise<WithPagination<AuthorsRow>> => {
	const [authors, count] = await Promise.all([
		getPaginatedAuthors(page, pageSize, search),
		countAuthors(search),
	]);

	const mappedAuthors: AuthorsRow[] = authors.map((author) => ({
		createdAt: formatDate(author.createdAt).format('LLL'),
		id: author.id,
		name: author.name,
		updatedAt: formatDate(author.updatedAt).format('LLL'),
		image: author.image || '',
	}));

	return {
		data: mappedAuthors,
		totalPages: calculateTotalPages(count, pageSize),
	};
};

export const deleteAuthorUseCase = async (id: string) => {
	const author = await findAuthorById(id);

	if (!author) {
		throw new CustomError('Author not found');
	}

	await deleteAuthor(id);
};

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
