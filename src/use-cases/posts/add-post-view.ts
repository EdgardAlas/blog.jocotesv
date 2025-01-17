import { addPostView, findPostBySlug } from '@/data-acces/posts';

export const addPostViewUseCase = async (slug: string) => {
	const post = await findPostBySlug(slug);

	if (post) {
		return addPostView(slug);
	}

	return null;
};

