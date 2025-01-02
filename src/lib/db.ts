import { env } from '@/lib/env';
import * as schema from '@/drizzle/schema';
import { PostgresJsDatabase, drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

declare global {
	// eslint-disable-next-line no-var
	var globalDB: PostgresJsDatabase<typeof schema> | undefined;
}

let db: PostgresJsDatabase<typeof schema>;

if (process.env.NODE_ENV === 'production') {
	db = drizzle(postgres(env.DATABASE_URL), { schema });
} else {
	if (!global.globalDB) {
		global.globalDB = drizzle(postgres(env.DATABASE_URL), {
			schema,
			logger: true,
		});
	}
	db = global.globalDB;
}

export { db };
