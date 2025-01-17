import { UserRow } from '@/app/admin/(dashboard)/users/_types/users';
import { roles } from '@/config/roles';
import { findUserByEmail } from '@/data-acces/users';
import { CustomError } from '@/helpers/custom-error';
import { currentUser } from '@/lib/current-user';
import { formatDate } from '@/lib/format-dates';

export const findUserByEmailUseCase = async (
	email: string
): Promise<UserRow> => {
	const user = await findUserByEmail(email);
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
		updatedAt: formatDate(user.updatedAt).format('LLL'),
		canBeDeleted: auth?.id !== user.id && auth?.role !== roles.owner,
	};
};
