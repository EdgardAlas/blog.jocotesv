'use client';

import { CrudModal } from '@/components/ui/crud-modal';
import { useCrudModalStore } from '@/context/crud-modal.context';
import { useForm } from 'react-hook-form';

export const CategoryModal = () => {
	const { data } = useCrudModalStore();
	const form = useForm();
	return (
		<CrudModal
			title='Category'
			form={form}
			onSubmit={(values) => {
				console.log(values);
			}}
		>
			{JSON.stringify(data)}
		</CrudModal>
	);
};
