'use client';

import {
	ConfirmDialogProvider as BaseConfirmDialogProvider,
	ConfirmOptions,
} from '@/components/ui/confirm-dialog';

interface Props {
	children: React.ReactNode;
	defaultOptions?: ConfirmOptions;
}

export const ConfirmDialogProvider = ({ children, defaultOptions }: Props) => {
	return (
		<BaseConfirmDialogProvider defaultOptions={defaultOptions}>
			{children}
		</BaseConfirmDialogProvider>
	);
};
