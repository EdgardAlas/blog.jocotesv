import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PostCard } from '../_components/post-card';
import { Hero } from '@/app/(public)/(home)/_components/hero';
import { findHomePagePostsUseCase } from '@/use-cases/posts.use-case';

// Force static generation
export const dynamic = 'force-static';
// Revalidate every 24 hours (86400 seconds)
export const revalidate = 86400;

export default async function HomePage() {
	const data = await findHomePagePostsUseCase();
	return (
		<div className='container mx-auto px-4 py-8'>
			<Hero />

			<div className='rounded-lg bg-accent p-8 shadow-sm'>
				{data.featuredPosts.length > 0 && (
					<section className='mb-12'>
						<h2 className='mb-6 text-3xl font-bold'>Featured Posts</h2>
						<div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
							{data.featuredPosts.map((post) => (
								<PostCard key={post.id} post={post} />
							))}
						</div>
					</section>
				)}

				{data.recentPosts.length > 0 ? (
					<section>
						<h2 className='mb-6 text-3xl font-bold'>Recent Posts</h2>
						<div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
							{data.recentPosts.map((post) => (
								<PostCard key={post.id} post={post} />
							))}
						</div>
						<div className='mt-8 text-center'>
							<Button asChild variant='outline'>
								<Link href='/posts'>View All Posts</Link>
							</Button>
						</div>
					</section>
				) : (
					<h2 className='text-center text-2xl font-bold'>
						No recent posts available
					</h2>
				)}
			</div>
		</div>
	);
}
