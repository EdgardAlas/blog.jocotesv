import '@/lib/load-env';

import { z } from 'zod';

const envSchema = z.object({
	/* DATABASE_URL: z.string(),
	AUTH_SECRET: z.string(),
	AUTH_TRUST_HOST: z.string().transform((val) => !!val),
	JWT_SECRET: z.string(), */
	CLOUDINARY_CLOUD_NAME: z.string(),
	CLOUDINARY_API_KEY: z.string(),
	CLOUDINARY_API_SECRET: z.string(),
});

export const env = envSchema.parse(process.env);
