import { getPostsWithRelated } from '@/data-acces/posts';

export const getAllPostsWithRelatedsUseCase = () => {
	return getPostsWithRelated();
};
