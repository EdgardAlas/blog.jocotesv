import { RenderHTML } from '@/components/ui/render-html';
import {
	findInvalidPostsUseCase,
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

	const post = await findInvalidPostsUseCase(id);

	return {
		title: post?.title,
		description: post?.description,
		openGraph: post?.image ? { url: post.image } : {},
	};
}

const PostPage = async ({ params }: PostPageProps) => {
	const { slug } = await params;

	const post = await findInvalidPostsUseCase(slug);

	if (!post) {
		notFound();
	}

	return (
		<div className='p-4'>
			<article className='mx-auto max-w-[80ch] rounded-md bg-white p-4 shadow-md'>
				<h1 className='mb-4 text-4xl font-bold'>{post.title}</h1>
				<div className='mb-3 flex items-center'>
					<div>
						<p className='text-sm font-medium'>{post.author}</p>
						<p className='text-sm text-muted-foreground'>
							{format(post.publicationDate, 'MMMM d, yyyy')}
						</p>
					</div>
				</div>
				<RenderHTML code={post.content} />
			</article>
		</div>
	);
};

export default PostPage;
