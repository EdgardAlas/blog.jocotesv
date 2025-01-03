import { useCrudModalStore } from '@/context/crud-modal.context';
import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useInitEditForm = <T extends Record<string, any>>(
	values: T,
	form: UseFormReturn<T>
) => {
	const { data } = useCrudModalStore();

	useEffect(() => {
		if (data) {
			form.reset(data);
		} else {
			form.reset(values);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data]);
};
