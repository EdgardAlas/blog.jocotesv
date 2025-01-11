import { PublicPostCardType } from '@/app/(public)/_types/public-post-card';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import Link from 'next/link';

export function PublicPostCard({ post }: { post: PublicPostCardType }) {
	return (
		<Link
			href={post.url ?? '#'}
			className='group block transition-transform duration-300 hover:scale-105'
		>
			<Card className='overflow-hidden transition-shadow hover:shadow-md'>
				<CardHeader className='p-0'>
					<Image
						src={post.imageUrl}
						alt={post.title}
						width={300}
						height={200}
						className='h-48 w-full object-cover transition-transform'
					/>
				</CardHeader>
				<CardContent className='p-4'>
					<h3 className='mb-2 text-lg font-semibold transition-colors group-hover:text-primary'>
						{post.title}
					</h3>
					<div className='flex flex-wrap gap-2'>
						{post.categories.map((category) => (
							<Badge key={category}>{category}</Badge>
						))}
					</div>
					<p className='mt-2 text-xs text-gray-600'>
						Author: <span className='font-semibold'>{post.author}</span>
					</p>
				</CardContent>
			</Card>
		</Link>
	);
}

export const PublicPostCardSkeleton = () => (
	<Card className='overflow-hidden'>
		<CardHeader className='p-0'>
			<Skeleton className='h-48 w-full' />
		</CardHeader>
		<CardContent className='p-4'>
			<Skeleton className='mb-2 h-6 w-3/4' />
			<div className='flex flex-wrap gap-2'>
				<Skeleton className='h-4 w-16' />
			</div>
			<Skeleton className='mt-2 h-4 w-20' />
		</CardContent>
	</Card>
);
