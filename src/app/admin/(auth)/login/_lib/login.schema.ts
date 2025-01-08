import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export const loginSchema = z.object({
	email: z.string().email('Invalid email address'),
	password: z.string(),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const loginResolver = zodResolver(loginSchema);
