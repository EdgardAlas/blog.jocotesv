/* eslint-disable @next/next/no-img-element */
'use client';

import { uploadMediaAction } from '@/app/admin/media/_lib/media.actions';
import {
	UploadMediaSchema,
	UploadMediaSchemaResolver,
} from '@/app/admin/media/_lib/media.schema';
import { Button } from '@/components/ui/button';
import { CrudModal } from '@/components/ui/crud-modal';
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { handleSafeActionResponse } from '@/lib/handle-safe-action-response';
import { Upload, X } from 'lucide-react';
import { useMemo, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const FOLDERS = [
	{ value: 'post-content-images', label: 'Post Content Images' },
	{ value: 'post-seo-images', label: 'Post SEO Images' },
];

export const UploadImageForm = () => {
	const form = useForm<z.infer<typeof UploadMediaSchema>>({
		defaultValues: {
			folder: 'post-content-images',
			image: undefined,
		},
		resolver: UploadMediaSchemaResolver,
	});
	const [uploading, startUploading] = useTransition();

	const image = form.watch('image');
	const localUrl = useMemo(() => {
		if (image) {
			return URL.createObjectURL(image);
		}

		return '';
	}, [image]);

	return (
		<CrudModal
			form={form}
			onSubmit={(e) => {
				if (uploading) return;

				startUploading(async () => {
					await handleSafeActionResponse({
						action: uploadMediaAction(e),
						successMessage: 'Image uploaded successfully',
						loadingMessage: 'Uploading image...',
					});
				});
			}}
			title='Media'
		>
			<FormField
				control={form.control}
				name='folder'
				render={({ field }) => (
					<FormItem>
						<FormLabel>Status</FormLabel>
						<FormControl>
							<Select value={field.value} onValueChange={field.onChange}>
								<SelectTrigger>
									<SelectValue placeholder='Select folder' />
								</SelectTrigger>
								<SelectContent>
									{FOLDERS.map((folder) => (
										<SelectItem key={folder.value} value={folder.value}>
											{folder.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<FormField
				name='image'
				control={form.control}
				render={({ field }) => (
					<FormItem>
						<FormLabel>Image</FormLabel>
						{field.value ? (
							<div className='relative w-full'>
								<img
									src={localUrl}
									alt='Post Image'
									className='w-full object-cover'
								/>
								<Button
									className='absolute right-1 top-1'
									size={'icon'}
									variant={'ghost'}
									loading={uploading}
									icon={X}
									onClick={() => {
										field.onChange(null);
									}}
								/>
							</div>
						) : (
							<FormControl>
								<Input
									type='file'
									accept='image/*'
									ref={field.ref}
									onChange={(e) => {
										field.onChange(e.target?.files?.[0]);
									}}
								/>
							</FormControl>
						)}
						<FormMessage />
					</FormItem>
				)}
			/>
			<Button
				type='submit'
				className='w-full'
				icon={Upload}
				loading={uploading}
			>
				Upload
			</Button>
		</CrudModal>
	);
};
