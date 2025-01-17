import { Post } from '@/app/[locale]/(public)/[slug]/_types/post';
import { findPublishedPostBySlug } from '@/data-acces/posts';
import { cache } from 'react';

export const findPublishedPostUseCase = cache(
	async (slug: string): Promise<Post | null> => {
		const posts = await findPublishedPostBySlug(slug);

		if (!posts) {
			return null;
		}

		return {
			author: posts.author?.name ?? '',
			content: posts.content ?? '',
			id: posts.id ?? '',
			title: posts.title ?? '',
			publicationDate: posts.publicationDate ?? '',
			description: posts.description ?? '',
			image: posts.image ?? '',
			lang: posts.lang ?? '',
			related: posts.relatedPosts,
		};
	}
);
