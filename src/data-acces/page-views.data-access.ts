import { NewPageView, pageViews } from '@/drizzle/schema';
import { db } from '@/lib/db';

export const insertPostView = async (view: NewPageView) => {
	const response = await db.insert(pageViews).values(view).returning({
		id: pageViews.id,
	});

	return response[0].id;
};
