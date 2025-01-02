'use client';

import { CrudModal } from '@/components/ui/crud-modal';
import { useCrudModalStore } from '@/context/crud-modal.context';

export const CategoryModal = () => {
	const { data } = useCrudModalStore();
	return <CrudModal title='Category'>{JSON.stringify(data)}</CrudModal>;
};
