'use client';

import { loginAction } from '@/app/admin/(auth)/login/_lib/login.actions';
import {
	loginResolver,
	LoginSchema,
} from '@/app/admin/(auth)/login/_lib/login.schema';
import { handleSafeActionResponse } from '@/lib/handle-safe-action-response';
import { useForm } from 'react-hook-form';

export const useLoginForm = () => {
	const form = useForm<LoginSchema>({
		defaultValues: {
			email: '',
			password: '',
		},
		resolver: loginResolver,
	});

	const onSubmit = async (data: TODO) => {
		await handleSafeActionResponse({
			action: loginAction(data),
			successMessage: 'Logged in successfully',
			loadingMessage: 'Logging in...',
			showSuccessToast: false,
		});
	};

	return {
		form,
		onSubmit,
	};
};

