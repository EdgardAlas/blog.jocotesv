import '@/lib/load-env';

import { z } from 'zod';

const envSchema = z.object({
	DATABASE_URL: z.string(),
	AUTH_SECRET: z.string(),
	AUTH_TRUST_HOST: z.string().transform((val) => !!val),
	CLOUDINARY_CLOUD_NAME: z.string(),
	CLOUDINARY_API_KEY: z.string(),
	CLOUDINARY_API_SECRET: z.string(),
	GA_ID: z.string(),
});

export const env = envSchema.parse(process.env);
