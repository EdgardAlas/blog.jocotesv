import { DeletePostButton } from '@/app/admin/(dashboard)/posts/_components/delete-post-button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { capitalize } from '@/helpers/capitalize';
import Link from 'next/link';

interface PostCardListsProps {
	slug: string;
	title: string;
	description: string;
	id: string;
	image: string;
	categories: string[];
	author: string;
	publicationDate: string;
	updatedAt: string;
	status: string;
}

export const PostCard = ({
	author,
	categories,
	description,
	id,
	image,
	publicationDate,
	slug,
	title,
	updatedAt,
	status,
}: PostCardListsProps) => {
	return (
		<Link href={`/admin/post/${slug}`} key={id}>
			<div className='grid h-full cursor-pointer overflow-hidden rounded border shadow-sm transition-transform duration-300 hover:scale-105'>
				<div
					className='relative flex h-60 w-full items-center space-x-4 bg-cover bg-center bg-no-repeat'
					style={{
						backgroundImage: image ? `url(${image})` : 'url(/placeholder.webp)',
					}}
				>
					<Badge
						className='absolute right-2 top-2'
						variant={status === 'published' ? 'default' : 'secondary'}
					>
						{capitalize(status)}
					</Badge>
				</div>
				<div className='grid gap-2 p-4'>
					{categories.length ? (
						<div className='flex flex-wrap gap-2'>
							{categories.map((category, index) => (
								<Badge key={index}>{category}</Badge>
							))}
						</div>
					) : (
						<div>
							<Badge>No category</Badge>
						</div>
					)}
					<div className='gap- flex items-center justify-between'>
						<div>
							{title && <p className='text-sm font-semibold'>{title}</p>}
							{description && (
								<p className='text-xs text-gray-500'>{description}</p>
							)}
							{slug && (
								<p className='text-xs font-bold text-gray-500'>{`/${slug}`}</p>
							)}
							{author && (
								<div>
									<p className='text-xs text-gray-600'>By {author}</p>
								</div>
							)}
							{publicationDate && (
								<p className='text-xs text-gray-600'>{publicationDate}</p>
							)}
						</div>
						<div className='flex gap-2'>
							<DeletePostButton id={id} slug={slug} />
						</div>
					</div>
					<p className='text-xs text-gray-600'>
						The post was last updated on{' '}
						<span className='font-semibold'>{updatedAt}</span>
					</p>
				</div>
			</div>
		</Link>
	);
};

export const PostCardSkeleton = () => (
	<div className='grid h-full cursor-pointer overflow-hidden rounded border shadow-sm'>
		<Skeleton className='w-ful h-60 rounded-none' />
		<div className='grid gap-2 p-4'>
			<Skeleton className='h-4 w-1/2' />

			<div className='flex items-center justify-between gap-2'>
				<div className='flex flex-1 flex-col gap-2'>
					<Skeleton className='h-4 w-full' />
					<Skeleton className='h-4 w-full' />
					<Skeleton className='h-4 w-full' />
					<Skeleton className='h-4 w-full' />
				</div>
				<div className='flex gap-2'>
					<Skeleton className='size-9' />
				</div>
			</div>
			<Skeleton className='h-4 w-full' />
		</div>
	</div>
);
