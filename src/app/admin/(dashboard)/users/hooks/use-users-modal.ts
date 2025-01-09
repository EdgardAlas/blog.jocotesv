'use client';

import { saveUserAction } from '@/app/admin/(dashboard)/users/_lib/users.actions';
import {
	SaveUserResolver,
	SaveUserSchema,
} from '@/app/admin/(dashboard)/users/_lib/users.schema';
import { useCrudModalStore } from '@/context/crud-modal.context';
import { handleSafeActionResponse } from '@/lib/handle-safe-action-response';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const RESET_VALUES: z.infer<typeof SaveUserSchema> = {
	name: '',
	email: '',
	password: '',
	role: 'editor',
	id: '',
};

export const useUsersModal = () => {
	const { setOpen } = useCrudModalStore();
	const [loading, startTransition] = useTransition();

	const form = useForm<z.infer<typeof SaveUserSchema>>({
		defaultValues: RESET_VALUES,
		resolver: SaveUserResolver,
	});

	const onSubmit = async (values: z.infer<typeof SaveUserSchema>) => {
		if (loading) return;

		startTransition(async () => {
			await handleSafeActionResponse({
				action: saveUserAction(values),
				loadingMessage: 'Saving author...',
				successMessage: 'Author saved successfully',
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
