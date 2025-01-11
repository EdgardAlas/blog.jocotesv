import { PostCardType } from '@/app/(public)/_types/post-card';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

export function PostCard({ post }: { post: PostCardType }) {
	return (
		<Link href={post.url ?? '#'} className='group block'>
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
