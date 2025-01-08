import { ImageCardButtons } from '@/app/admin/(dashboard)/media/_components/delete-image-button';
import { Skeleton } from '@/components/ui/skeleton';

interface ImageCardProps {
	url: string;
	postCount: number;
	publicId: string;
}

export const ImageCard = ({ url, postCount, publicId }: ImageCardProps) => {
	return (
		<div className='grid gap-2 rounded border shadow-sm'>
			<div
				className='w-fullb flex h-60 items-center space-x-4 bg-cover bg-center bg-no-repeat'
				style={{
					backgroundImage: `url(${url})`,
				}}
			/>
			<div className='flex items-center justify-between gap-2 p-4'>
				<p className='text-sm font-semibold'>Posts: {postCount}</p>
				<div className='flex gap-2'>
					<ImageCardButtons publicId={publicId} />
				</div>
			</div>
		</div>
	);
};

export const ImageCardSkeleton = () => {
	return (
		<div className='grid gap-2 rounded border shadow-sm'>
			<Skeleton className='w-fullb h-60' />
			<div className='flex items-center justify-between gap-2 p-4'>
				<Skeleton className='h-4 w-1/2' />
				<div className='flex gap-2'>
					<Skeleton className='size-9' />
					<Skeleton className='size-9' />
				</div>
			</div>
		</div>
	);
};
