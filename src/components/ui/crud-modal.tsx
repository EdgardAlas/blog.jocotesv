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

	// TODO: improve this code to avoid using useEffect to reset the form values

	useEffect(() => {
		if (data) {
			form.reset(data);
		} else {
			form.reset(resetValues);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, open]);

	useEffect(() => {
		if (!open) {
			setTimeout(() => {
				setData(null);
			}, RESET_TIMEOUT);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [open]);

	return (
		<Dialog modal defaultOpen={open} open={open} onOpenChange={setOpen}>
			<DialogContent className='text-left'>
				<DialogDescription />
				<DialogHeader>
					<DialogTitle className='text-left'>
						{data ? 'Edit' : 'Add'} {title}
					</DialogTitle>
				</DialogHeader>
				<FormProvider
					form={form}
					className={cn('space-y-4', className)}
					{...props}
				>
					{children}
				</FormProvider>
			</DialogContent>
		</Dialog>
	);
};
