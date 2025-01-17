import { nanoid } from 'nanoid';
import slugify from 'slugify';

export const generateSlugUseCase = async (slug: string) => {
	const newSlug = `${slug}-${nanoid(4)}`;
	return slugify(newSlug, { lower: true });
};

