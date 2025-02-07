import { formatDate } from '@/lib/format-dates';
import { getAllPostsWithRelatedsUseCase } from '@/use-cases/posts/get-all-posts-with-relateds';
import type { MetadataRoute } from 'next';

export const revalidate = 40;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const posts = await getAllPostsWithRelatedsUseCase();

	return [
		{
			url: 'https://blog.jocotesv.com/en',
			alternates: {
				languages: {
					es: 'https://blog.jocotesv.com/es',
				},
			},
		},
		{
			url: 'https://blog.jocotesv.com/en/search',
			alternates: {
				languages: {
					es: 'https://blog.jocotesv.com/es/search',
				},
			},
		},
		...posts.map((post) => {
			return {
				url: `https://blog.jocotesv.com/${post.lang}/${post.slug}`,
				lastModified: formatDate(post.updatedAt).toDate().toISOString(),
				alternates: {
					languages: post.posts.reduce(
						(acc, relatedPost) => {
							acc[relatedPost.lang] =
								`https://blog.jocotesv.com/${relatedPost.lang}/${relatedPost.slug}`;
							return acc;
						},
						{} as Record<string, string>
					),
				},
			};
		}),
	];
}
