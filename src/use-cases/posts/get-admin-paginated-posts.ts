import { Post } from '@/app/admin/(dashboard)/post/_types/posts';
import { countPosts, findAdminPaginatedPosts } from '@/data-acces/posts';
import { calculateTotalPages } from '@/helpers/calculate-total-pages';
import { postMapper } from '@/use-cases/posts/post-mapper';

export const findAdminPaginationPostsUseCase = async (
	page: number,
	limit: number,
	filters: { search: string; status: string }
): Promise<WithPagination<Post>> => {
	const [posts, total] = await Promise.all([
		findAdminPaginatedPosts(page, limit, filters),
		countPosts(filters),
	]);

	const mappedPosts: Post[] = posts.map(postMapper);
	return {
		data: mappedPosts,
		totalPages: calculateTotalPages(total, limit),
	};
};
