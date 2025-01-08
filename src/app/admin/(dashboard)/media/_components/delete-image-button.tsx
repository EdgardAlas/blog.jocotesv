'use client';
import { deleteMediaAction } from '@/app/admin/(dashboard)/media/_lib/media.actions';
import { Button } from '@/components/ui/button';
import { useConfirm } from '@/components/ui/confirm-dialog';
import { handleSafeActionResponse } from '@/lib/handle-safe-action-response';
import { Eye, Trash } from 'lucide-react';
import { useTransition } from 'react';
import { toast } from 'sonner';

export const ImageCardButtons = ({ publicId }: { publicId: string }) => {
	const [deleting, startDeleting] = useTransition();
	const confirm = useConfirm();
	return (
		<>
			<Button
				loading={deleting}
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
		</>
	);
};
