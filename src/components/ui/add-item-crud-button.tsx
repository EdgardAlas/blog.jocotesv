'use client';

import { Button, ButtonProps } from '@/components/ui/button';
import { useCrudModalStore } from '@/context/crud-modal.context';
import { Plus } from 'lucide-react';

type AddItemCrudButtonProps = ButtonProps;

export const AddItemCrudButton = ({ ...props }: AddItemCrudButtonProps) => {
	const { setOpen } = useCrudModalStore();

	return <Button icon={Plus} onClick={() => setOpen(true)} {...props} />;
};
