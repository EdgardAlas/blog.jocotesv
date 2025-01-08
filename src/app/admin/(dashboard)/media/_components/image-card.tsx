'use client';

import { deleteMediaAction } from '@/app/admin/(dashboard)/media/_lib/media.actions';
import { Button } from '@/components/ui/button';
import { useConfirm } from '@/components/ui/confirm-dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { handleSafeActionResponse } from '@/lib/handle-safe-action-response';
import { Eye, Trash } from 'lucide-react';
import { useTransition } from 'react';
import { toast } from 'sonner';

interface ImageCardProps {
	url: string;
	postCount: number;
	publicId: string;
}

export const ImageCard = ({ url, postCount, publicId }: ImageCardProps) => {
	const [deleting, startDeleting] = useTransition();
	const confirm = useConfirm();

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
					<Button
						variant='destructive'
						size='sm'
						onClick={async () => {
							if (deleting) return;

							const shouldDelete = await confirm({
								title: 'Delete image',
								description: (
									<span>
										Are you sure you want to delete this image? This action
										<span className='font-bold'> cannot be undone</span> and the
										image{' '}
										<span className='font-bold'>
											will be removed from all posts
										</span>
										.
									</span>
								),
							});

							if (!shouldDelete) return;

							startDeleting(async () => {
								await handleSafeActionResponse({
									action: deleteMediaAction(publicId),
									successMessage: 'Image deleted successfully',
									loadingMessage: 'Deleting image...',
								});
							});
						}}
					>
						<Trash size={16} />
					</Button>
					<Button
						size='sm'
						onClick={() => {
							toast.info('This feature is not implemented yet');
						}}
					>
						<Eye size={16} />
					</Button>
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
