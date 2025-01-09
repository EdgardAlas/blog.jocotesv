'use client';

import { Button, ButtonProps } from '@/components/ui/button';
import {
	CrudModalOptions,
	useCrudModalStore,
} from '@/context/crud-modal.context';
import { Plus } from 'lucide-react';

type AddItemCrudButtonProps = ButtonProps & {
	noOpenModal?: boolean;
	openModal?: CrudModalOptions;
};

export const AddItemCrudButton = ({
	asChild,
	noOpenModal,
	openModal,
	...props
}: AddItemCrudButtonProps) => {
	const { setOpen } = useCrudModalStore();

	return (
		<Button
			icon={Plus}
			onClick={() => {
				if (!noOpenModal && openModal) {
					setOpen(openModal);
				}
			}}
			asChild={asChild}
			{...props}
		/>
	);
};
