'use client';
import { FormProvider, FormProviderProps } from '@/components/form-provider';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { useCrudModalStore } from '@/context/crud-modal.context';
import { cn } from '@/lib/utils';
import { DialogDescription } from '@radix-ui/react-dialog';
import React, { useEffect } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';

interface CrudModalProps<T extends FieldValues> extends FormProviderProps<T> {
	title: string;
	children?: React.ReactNode;
	form: UseFormReturn<T>;
	resetValues?: T;
}

const RESET_TIMEOUT = 200;

export const CrudModal = <T extends FieldValues>({
	title,
	children,
	form,
	resetValues,
	className,
	...props
}: CrudModalProps<T>) => {
	const { open, data, setOpen, setData } = useCrudModalStore();

	useEffect(() => {
		if (data) {
			form.reset(data);
		} else {
			form.reset(resetValues);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data]);

	return (
		<Dialog
			modal
			defaultOpen={open}
			open={open}
			onOpenChange={(open) => {
				setTimeout(() => {
					setData(null);
				}, RESET_TIMEOUT);

				setOpen(open);
			}}
		>
			<DialogContent>
				<DialogDescription />
				<DialogHeader>
					<DialogTitle className='text-left'>
						{data ? 'Edit' : 'Add'} {title}
					</DialogTitle>
					<FormProvider
						form={form}
						className={cn('space-y-4', className)}
						{...props}
					>
						{children}
					</FormProvider>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};
