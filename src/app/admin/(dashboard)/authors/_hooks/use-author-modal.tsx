import { saveAuthorAction } from '@/app/admin/(dashboard)/authors/_lib/authors.actions';
import {
	SaveAuthorResolver,
	SaveAuthorSchema,
} from '@/app/admin/(dashboard)/authors/_lib/authors.schema';
import { useCrudModalStore } from '@/context/crud-modal.context';
import { handleSafeActionResponse } from '@/lib/handle-safe-action-response';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const RESET_VALUES: z.infer<typeof SaveAuthorSchema> = {
	name: '',
	id: '',
};

export const useAuthorsModal = () => {
	const { setOpen } = useCrudModalStore();
	const [loading, startTransition] = useTransition();

	const form = useForm<z.infer<typeof SaveAuthorSchema>>({
		defaultValues: RESET_VALUES,
		resolver: SaveAuthorResolver,
	});

	const onSubmit = async (values: z.infer<typeof SaveAuthorSchema>) => {
		if (loading) return;

		startTransition(async () => {
			await handleSafeActionResponse({
				action: saveAuthorAction(values),
				loadingMessage: 'Saving author...',
				successMessage: 'Author saved',
				onSuccess() {
					setOpen(null);
				},
			});
		});
	};

	return {
		form,
		loading,
		onSubmit,
		RESET_VALUES,
	};
};
