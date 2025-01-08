import { saveCategoryAction } from '@/app/admin/(dashboard)/categories/_lib/categories.actions';
import {
	SaveCategoryResolver,
	SaveCategorySchema,
} from '@/app/admin/(dashboard)/categories/_lib/categories.schema';
import { useCrudModalStore } from '@/context/crud-modal.context';
import { handleSafeActionResponse } from '@/lib/handle-safe-action-response';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const RESET_VALUES: z.infer<typeof SaveCategorySchema> = {
	name: '',
	id: '',
};

export const useCategoriesModal = () => {
	const { setOpen } = useCrudModalStore();
	const [loading, startTransition] = useTransition();

	const form = useForm<z.infer<typeof SaveCategorySchema>>({
		defaultValues: RESET_VALUES,
		resolver: SaveCategoryResolver,
	});

	const onSubmit = async (values: z.infer<typeof SaveCategorySchema>) => {
		if (loading) return;

		startTransition(async () => {
			await handleSafeActionResponse({
				action: saveCategoryAction(values),
				loadingMessage: 'Saving category...',
				successMessage: 'Category saved',
				onSuccess() {
					setOpen(false);
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
