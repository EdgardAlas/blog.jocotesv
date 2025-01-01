'use client';

import { handleSafeActionError } from '@/lib/handle-safe-action-error';
import { SafeActionResult } from 'next-safe-action';
import { toast } from 'sonner';

export const handleSafeActionResponse = async ({
	action,
	successMessage = 'Success',
	errorMessage,
	loadingMessage = 'Loading...',
	onSuccess,
	onError,
	showSuccessToast = true,
	showErrorToast = true,
}: {
	action: Promise<SafeActionResult<TODO, TODO, TODO, TODO> | undefined>;
	successMessage?: string;
	errorMessage?: string;
	loadingMessage?: string;
	onSuccess?: (data: TODO) => void;
	onError?: (data: TODO) => void;
	showSuccessToast?: boolean;
	showErrorToast?: boolean;
}) => {
	if (!action) {
		toast.error('There was an error with the action');
		return null;
	}

	let id: string | number = -1;

	if (showSuccessToast) {
		id = toast.loading(loadingMessage);
	}

	const response = await action;

	if (
		handleSafeActionError({
			response,
			toastId: id,
			errorMessage,
			showToast: showErrorToast,
		})
	) {
		await onError?.(response);
		return response?.data;
	}

	if (showSuccessToast) {
		toast.success(successMessage, { id });
	}

	await onSuccess?.(response?.data);
	return response?.data;
};
