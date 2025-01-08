'use client';

import { uploadMediaAction } from '@/app/admin/(dashboard)/media/_lib/media.actions';
import {
	UploadMediaSchema,
	UploadMediaSchemaResolver,
} from '@/app/admin/(dashboard)/media/_lib/media.schema';
import { useCrudModalStore } from '@/context/crud-modal.context';
import { handleSafeActionResponse } from '@/lib/handle-safe-action-response';
import { useMemo, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const FOLDERS = [
	{ value: 'post-content-images', label: 'Post Content Images' },
	{ value: 'post-seo-images', label: 'Post SEO Images' },
];

export const useUploadImageForm = () => {
	const form = useForm<z.infer<typeof UploadMediaSchema>>({
		defaultValues: {
			folder: 'post-content-images',
			image: undefined,
		},
		resolver: UploadMediaSchemaResolver,
	});
	const [uploading, startUploading] = useTransition();
	const { setOpen } = useCrudModalStore();

	const image = form.watch('image');
	const localUrl = useMemo(() => {
		if (image) {
			return URL.createObjectURL(image);
		}

		return '';
	}, [image]);

	const onSubmit = async (e: z.infer<typeof UploadMediaSchema>) => {
		if (uploading) return;

		startUploading(async () => {
			await handleSafeActionResponse({
				action: uploadMediaAction(e),
				successMessage: 'Image uploaded successfully',
				loadingMessage: 'Uploading image...',
				onSuccess() {
					setOpen(false);
				},
			});
		});
	};

	return {
		form,
		uploading,
		startUploading,
		localUrl,
		onSubmit,
		FOLDERS,
	};
};
