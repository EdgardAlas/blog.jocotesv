import { roles } from '@/config/roles';
import { deleteUser, findUserById } from '@/data-acces/users';
import { CustomError } from '@/helpers/custom-error';

export const deleteUserUseCase = async (id: string) => {
	const user = await findUserById(id);

	if (user?.role === roles.owner) {
		throw new CustomError('You cannot delete the owner');
	}

	await deleteUser(id);
};
