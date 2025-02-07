import { SavePostSchema } from '@/app/admin/(dashboard)/post/_lib/post.schema';
import { findLangPostBySlug, findPostBySlug } from '@/data-acces/posts';
import { formatDate } from '@/lib/format-dates';
import { nanoid } from 'nanoid';
import slugify from 'slugify';
import { z } from 'zod';

export const getInitialValuesUseCase = async (
	slug: string = '',
	lang: string = 'en'
): Promise<z.infer<typeof SavePostSchema> | null> => {
	if (!slug) {
		return {
			id: '',
			title: '',
			slug: '',
			description: '',
			content: '',
			author: { label: '', value: '' },
			categories: [],
			featured: false,
			image: '',
			status: 'draft',
			publicationDate: new Date(),
			lang: 'en',
			parentId: null,
			previousSlug: '',
			editPostUrl: '',
		};
	}

	if (lang && lang !== 'en') {
		const data = await findLangPostBySlug(slug, lang);

		if (!data) {
			return null;
		}

		const { post, langPost } = data;

		return {
			id: langPost?.id || '',
			title: langPost?.title || post.title,
			slug:
				langPost?.slug ||
				slugify(`${post.slug}-${lang}-${nanoid(4)}`, { lower: true }),
			description: langPost?.description || post.description || '',
			content: langPost?.content || post.content || '',
			author: {
				label: langPost?.author?.name || post.author?.name || '',
				value: langPost?.author?.id || post.author?.id || '',
			},
			categories:
				langPost?.postCategories.map((c) => ({
					label: c.category.name,
					value: c.category.id,
				})) || [],
			featured: langPost?.featured || langPost?.featured || false,
			image: langPost?.image || post.image || '',
			status: langPost?.status || post.status || 'draft',
			publicationDate: formatDate(
				langPost?.publicationDate || post.publicationDate
			).toDate(),
			parentId: langPost?.parentId || post.id,
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			lang: (langPost?.lang as any) ?? lang,
			previousSlug: langPost?.slug || post.slug,
			editPostUrl: `/admin/post/${post.slug}?lang=${lang}`,
		} satisfies z.infer<typeof SavePostSchema>;
	}

	const post = await findPostBySlug(slug);

	if (!post) {
		return null;
	}

	if (post.parentId) {
		return null;
	}

	return {
		id: post.id,
		title: post.title,
		slug: post.slug,
		description: post.description ?? '',
		content: post.content,
		author: { label: post.author?.name ?? '', value: post.author?.id ?? '' },
		categories: post.postCategories.map((c) => ({
			label: c.category.name,
			value: c.category.id,
		})),
		featured: post.featured ?? false,
		image: post.image ?? '',
		status: post.status,
		publicationDate: formatDate(post.publicationDate).toDate(),
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		lang: (post.lang as any) ?? 'en',
		parentId: post.parentId,
		previousSlug: post.slug,
		editPostUrl: `/admin/post/${post.slug}`,
	} satisfies z.infer<typeof SavePostSchema>;
};
