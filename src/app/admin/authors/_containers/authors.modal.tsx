'use client';

import { CrudModal } from '@/components/ui/crud-modal';
import { useCrudModalStore } from '@/context/crud-modal.context';

export const AuthorsModal = () => {
	const { data } = useCrudModalStore();
	return <CrudModal title='Author'>{JSON.stringify(data)}</CrudModal>;
};
