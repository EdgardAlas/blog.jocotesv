import { UserRow } from '@/app/admin/(dashboard)/users/_types/users';
import { roles } from '@/config/roles';
import { findUserById } from '@/data-acces/users';
import { CustomError } from '@/helpers/custom-error';
import { currentUser } from '@/lib/current-user';
import { formatDate } from '@/lib/format-dates';

export const findUserByIdUseCase = async (id: string): Promise<UserRow> => {
	const user = await findUserById(id);
	const auth = await currentUser();

	if (!user) {
		throw new CustomError('User not found');
	}

	return {
		createdAt: formatDate(user.createdAt).format('LLL'),
		email: user.email,
		id: user.id as string,
		name: user.name,
		role: user.role,
		canBeDeleted: auth?.id !== user.id && user?.role !== roles.owner,
		updatedAt: formatDate(user.updatedAt).format('LLL'),
	};
};
