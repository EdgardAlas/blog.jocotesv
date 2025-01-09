import { rolesEnum } from '@/config/roles';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

export const SaveUserSchema = z
	.object({
		id: z.string(),
		name: z.string().nonempty("Name can't be empty"),
		email: z.string().email('Invalid email address'),
		password: z.union([
			z
				.string()
				.nonempty('Password is required')
				.min(8, 'Password must be at least 8 characters long'),
			z.literal(''),
			z.undefined(),
		]),
		role: z.enum(rolesEnum),
	})
	.refine(
		(data) => {
			// if id is empty, password is required
			if (!data.id && !data.password) {
				return false;
			}

			return true;
		},
		{
			path: ['password'],
			message: "Password is required if you're creating a new user",
		}
	);

export const GetUserByIdSchema = z.string().nonempty('User id is required');

export const SaveUserResolver = zodResolver(SaveUserSchema);
