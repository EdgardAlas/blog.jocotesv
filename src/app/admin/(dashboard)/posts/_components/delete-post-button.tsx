'use client';

import { deletePostAction } from '@/app/admin/(dashboard)/posts/_lib/posts.actions';
import { Button } from '@/components/ui/button';
import { useConfirm } from '@/components/ui/confirm-dialog';
import { handleSafeActionResponse } from '@/lib/handle-safe-action-response';
import { Trash } from 'lucide-react';
import { useTransition } from 'react';

export const DeletePostButton = (props: { id: string; slug: string }) => {
	const [loading, startTransition] = useTransition();
	const confirm = useConfirm();
	return (
		<Button
			loading={loading}
			variant='destructive'
			size='sm'
			onClick={async (e) => {
				e.preventDefault();
				e.stopPropagation();

				const shouldDelete = await confirm({
					title: 'Delete Post',
					description: (
						<span>
							Are you sure you want to delete this post? This action{' '}
							<span className='font-semibold'>cannot be undone</span>.
						</span>
					),
				});

				if (!shouldDelete) return;

				startTransition(async () => {
					await handleSafeActionResponse({
						action: deletePostAction(props),
						loadingMessage: 'Deleting post...',
						successMessage: 'Post deleted successfully',
					});
				});
			}}
		>
			<Trash size={16} />
		</Button>
	);
};
