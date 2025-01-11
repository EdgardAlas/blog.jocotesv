import { Hero } from '@/app/(public)/(home)/_components/hero';
import { PostList } from '@/app/(public)/(home)/_components/post-list';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { findHomePagePostsUseCase } from '@/use-cases/posts.use-case';
import Link from 'next/link';

// Force static generation
export const dynamic = 'force-static';
// Revalidate every 24 hours (86400 seconds)
export const revalidate = 86400;

export default async function HomePage() {
	const data = await findHomePagePostsUseCase();
	return (
		<div className='container mx-auto px-4 py-8'>
			<Hero />

			<Card>
				<CardHeader />
				<CardContent className='space-y-8 px-6 md:px-8'>
					{data.featuredPosts.length > 0 && (
						<PostList posts={data.featuredPosts} title='Featured Posts' />
					)}

					{data.recentPosts.length > 0 ? (
						<PostList posts={data.recentPosts} title='Recent Posts' />
					) : (
						<h2 className='text-center text-2xl font-bold'>
							No recent posts available
						</h2>
					)}

					<div className='mt-8 text-center'>
						<Button asChild variant='outline'>
							<Link href='/posts'>View All Posts</Link>
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
