'use client';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { useCrudModalStore } from '@/context/crud-modal.context';
import React from 'react';

interface CrudModalProps {
	title: string;
	children?: React.ReactNode;
}

export const CrudModal = ({ title, children }: CrudModalProps) => {
	const { open, data, setOpen, setData } = useCrudModalStore();

	return (
		<Dialog
			modal
			defaultOpen={open}
			open={open}
			onOpenChange={(open) => {
				if (!open) {
					setTimeout(() => {
						setData(null);
					}, 200);
				}

				setOpen(open);
			}}
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className='text-left'>
						{data ? 'Edit' : 'Add'} {title}
					</DialogTitle>
					<div className='grid gap-4 py-2'>{children}</div>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};
