import { PageView } from '@/app/(public)/_components/page-view';
import { RenderHTML } from '@/components/ui/render-html';
import {
	findPublishedPostUseCase,
	getLastPostSlug,
} from '@/use-cases/posts.use-case';
import { format } from 'date-fns';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

// Revalidate every 24 hours (86400 seconds)
export const revalidate = 86400;

export async function generateStaticParams() {
	const posts = await getLastPostSlug();

	return posts.map((post) => ({
		slug: post,
	}));
}

interface PostPageProps {
	params: Promise<{ slug: string }>;
}

export async function generateMetadata({
	params,
}: PostPageProps): Promise<Metadata> {
	const id = (await params).slug;

	const post = await findPublishedPostUseCase(id);

	return {
		title: post?.title,
		description: post?.description,
		openGraph: post?.image ? { url: post.image } : {},
	};
}

const PostPage = async ({ params }: PostPageProps) => {
	const { slug } = await params;

	const post = await findPublishedPostUseCase(slug);

	if (!post) {
		notFound();
	}

	return (
		<div className='p-4'>
			<PageView id={post.id} />
			<article className='mx-auto max-w-[80ch] rounded-md bg-white p-5 shadow-md md:p-6'>
				<h1 className='mb-4 text-2xl font-bold md:text-3xl xl:text-4xl'>
					{post.title}
				</h1>
				<div className='mb-3 flex items-center'>
					<div>
						<p className='text-sm'>
							Created by <span className='font-bold'> {post.author}</span>
						</p>
						<p className='text-sm'>
							Published on {''}
							<span className='font-bold'>
								{format(post.publicationDate, 'MMMM d, yyyy')}
							</span>
						</p>
					</div>
				</div>
				<RenderHTML code={post.content} />
			</article>
		</div>
	);
};

export default PostPage;
