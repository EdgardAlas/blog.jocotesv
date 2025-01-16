import { AuthorsRow } from '@/app/admin/(dashboard)/authors/_types/authors';
import { getPaginatedAuthors, countAuthors } from '@/data-acces/authors';
import { calculateTotalPages } from '@/helpers/calculate-total-pages';
import { formatDate } from '@/lib/format-dates';

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
