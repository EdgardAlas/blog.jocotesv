import { Post } from '@/app/admin/(dashboard)/post/_types/posts';
import { findAdminPaginatedPosts } from '@/data-acces/posts';
import { formatDate } from '@/lib/format-dates';

export const postMapper = (
	post: Awaited<ReturnType<typeof findAdminPaginatedPosts>>[0]
): Post => ({
	id: post.id,
	title: post.title,
	slug: post.slug ?? '',
	image: post.image ?? '',
	categories: post.postCategories.map((c) => c.category.name),
	author: post?.author?.name ?? '',
	status: post.status,
	publicationDate: formatDate(post.publicationDate).format('MMMM DD, YYYY'),
	description: post.shortDescription ?? '',
	featured: post.featured ?? false,
	updatedAt: formatDate(post.updatedAt).format('LLLL'),
});

