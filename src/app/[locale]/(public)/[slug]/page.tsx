import { PostView } from '@/app/[locale]/(public)/_components/post-view';
import { Badge } from '@/components/ui/badge';
import { RenderHTML } from '@/components/ui/render-html';
import { getScopedI18n } from '@/locales/server';
import { findPublishedPostUseCase, getLastPostSlug } from '@/use-cases/posts';
import { format } from 'date-fns';
import { Metadata } from 'next';
import { setStaticParamsLocale } from 'next-international/server';
import { notFound, redirect } from 'next/navigation';

export async function generateStaticParams() {
	const posts = await getLastPostSlug('en');

	return posts.map((post) => ({
		slug: post.slug,
		locale: post.locale,
	}));
}

interface PostPageProps {
	params: Promise<{ slug: string; locale: string }>;
}

export async function generateMetadata({
	params,
}: PostPageProps): Promise<Metadata> {
	const { slug, locale } = await params;

	const post = await findPublishedPostUseCase(slug);

	return {
		title: post?.title,
		description: post?.description,
		alternates: {
			canonical:
				'https://blog.jocotesv.com/en/' +
				post?.related.find((post) => post.lang === 'en')?.slug,
			languages: post?.related
				.filter((post) => post.lang !== locale)
				.reduce(
					(acc, post) => ({
						...acc,
						[post.lang]: `https://blog.jocotesv.com/${post.lang}/${post.slug}`,
					}),
					{}
				),
		},
		openGraph: post?.image
			? {
					images: post.image,
					type: 'article',
					url: `https://blog.jocotesv.com/${locale}/${slug}`,
				}
			: {},
		keywords: post?.categories,
	};
}

const PostPage = async ({ params }: PostPageProps) => {
	const { slug, locale } = await params;
	setStaticParamsLocale(locale);

	const t = await getScopedI18n('post');
	const post = await findPublishedPostUseCase(slug);

	if (!post) {
		notFound();
	}

	if (post.lang !== locale) {
		const findLocalePost = post.related.find((post) => post.lang === locale);

		if (findLocalePost) {
			redirect(`/${locale}/${findLocalePost.slug}`);
		} else {
			notFound();
		}
	}

	return (
		<>
			<PostView slug={slug} />
			<article className='mx-auto max-w-[80ch] rounded-md bg-white p-5 shadow-md md:p-6'>
				<h1 className='mb-4 text-2xl font-bold md:text-3xl xl:text-4xl'>
					{post.title}
				</h1>
				<div className='mb-3 flex items-center'>
					<div>
						<p className='text-sm'>
							{t('createdBy')} <span className='font-bold'> {post.author}</span>
						</p>
						<p className='text-sm'>
							{t('publishedOn')}{' '}
							<span className='font-bold'>
								{format(post.publicationDate, 'MMMM d, yyyy')}
							</span>
						</p>
					</div>
				</div>
				<RenderHTML code={post.content} />
				{post.categories.length > 0 && (
					<div className='mt-8 flex flex-wrap gap-2'>
						{post.categories.map((category) => (
							<Badge key={category}>{category}</Badge>
						))}
					</div>
				)}
			</article>
		</>
	);
};

export default PostPage;
