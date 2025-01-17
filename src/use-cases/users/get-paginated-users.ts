import { UserRow } from '@/app/admin/(dashboard)/users/_types/users';
import { roles } from '@/config/roles';
import { countUsers, findPaginatedUsers } from '@/data-acces/users';

import { calculateTotalPages } from '@/helpers/calculate-total-pages';
import { currentUser } from '@/lib/current-user';
import { formatDate } from '@/lib/format-dates';

export const findPaginatedUsersUseCase = async (
	page: number,
	pageSize: number,
	search: string
): Promise<WithPagination<UserRow>> => {
	const [users, count, auth] = await Promise.all([
		findPaginatedUsers(page, pageSize, search),
		countUsers(search),
		currentUser(),
	]);

	const mappedUsers: UserRow[] = users.map((user) => ({
		createdAt: formatDate(user.createdAt).format('LLL'),
		email: user.email,
		id: user.id as string,
		name: user.name,
		role: user.role,
		updatedAt: formatDate(user.updatedAt).format('LLL'),
		canBeDeleted: auth?.id !== user.id && user?.role !== roles.owner,
	}));

	return {
		data: mappedUsers,
		totalPages: calculateTotalPages(count, pageSize),
	};
};
