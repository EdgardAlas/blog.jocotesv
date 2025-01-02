'use client';

import { CrudModal } from '@/components/ui/crud-modal';
import { useCrudModalStore } from '@/context/crud-modal.context';

export const UserModal = () => {
	const { data } = useCrudModalStore();
	return <CrudModal title='User'>{JSON.stringify(data)}</CrudModal>;
};
