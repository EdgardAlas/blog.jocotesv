'use client';

import { Button, ButtonProps } from '@/components/ui/button';
import { useCrudModalStore } from '@/context/crud-modal.context';
import { Plus } from 'lucide-react';

type AddItemCrudButtonProps = ButtonProps & {
	noOpenModal?: boolean;
};

export const AddItemCrudButton = ({
	asChild,
	noOpenModal,
	...props
}: AddItemCrudButtonProps) => {
	const { setOpen } = useCrudModalStore();

	return (
		<Button
			icon={Plus}
			onClick={() => {
				if (!noOpenModal) {
					setOpen(true);
				}
			}}
			asChild={asChild}
			{...props}
		/>
	);
};
