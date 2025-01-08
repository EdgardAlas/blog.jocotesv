/* eslint-disable @next/next/no-img-element */
'use client';

import {
	removePostContentImageAction,
	uploadPostContentImageAction,
} from '@/app/admin/(dashboard)/post/_lib/post.actions';
import { FormProvider } from '@/components/form-provider';
import { useToolbar } from '@/components/toolbars/toolbar-provider';
import { Button } from '@/components/ui/button';
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import { handleSafeActionResponse } from '@/lib/handle-safe-action-response';
import { zodResolver } from '@hookform/resolvers/zod';
import { ImageIcon, X } from 'lucide-react';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const addImageValidations = z.object({
	img: z.string().url({ message: 'Please enter a valid URL' }),
	alt: z.string().min(1, { message: 'Alt is required' }),
	id: z.string().min(1, { message: 'Id is required' }),
});

export const UploadImageToolbar = () => {
	const { editor } = useToolbar();
	const [loading, startLoading] = useTransition();

	const [open, setOpen] = useState(false);

	const addImage = (values: z.infer<typeof addImageValidations>) => {
		const url = values.img;

		if (url) {
			editor
				?.chain()
				.focus()
				// @ts-expect-error - data-id is not in the typings but it is specified in the schema
				.setImage({ src: url, alt: values.alt, 'data-id': values.id })
				.run();
		}

		form.reset({
			img: undefined,
			alt: '',
			id: '',
		});

		document.getElementById('img')?.setAttribute('value', '');
		setOpen(false);
	};

	const form = useForm<z.infer<typeof addImageValidations>>({
		defaultValues: {
			img: undefined,
			alt: '',
		},
		resolver: zodResolver(addImageValidations),
	});

	return (
		<TooltipProvider>
			<Tooltip>
				<Popover
					open={open}
					onOpenChange={(state) => {
						setOpen(state);
					}}
				>
					<PopoverTrigger asChild>
						<TooltipTrigger asChild>
							<button
								onClick={() => setOpen(true)}
								type='button'
								className='toggle-button'
							>
								<ImageIcon />
							</button>
						</TooltipTrigger>
					</PopoverTrigger>
					<TooltipContent>Upload Image</TooltipContent>
					<PopoverContent className='w-80'>
						<FormProvider
							className='flex flex-col gap-4'
							form={form}
							onSubmit={addImage}
						>
							<div className='grid gap-2 rounded-md border border-dashed p-4'>
								<FormField
									control={form.control}
									name='img'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Image</FormLabel>

											{typeof field.value === 'string' && field.value ? (
												<div className='relative w-full'>
													<img
														src={field.value}
														alt='Post Image'
														className='w-full object-cover'
													/>
													<Button
														className='absolute right-1 top-1'
														size={'icon'}
														variant={'ghost'}
														loading={loading}
														icon={X}
														onClick={() => {
															startLoading(async () => {
																await handleSafeActionResponse({
																	action: removePostContentImageAction({
																		url: field.value,
																	}),
																	successMessage: 'Image removed',
																	errorMessage: 'Error removing image',
																	onSuccess() {
																		form.setValue('img', '');
																	},
																});
															});
														}}
													/>
												</div>
											) : (
												<FormControl>
													<Input
														disabled={loading}
														type='file'
														accept='image/*'
														ref={field.ref}
														onChange={async (e) => {
															if (loading) return;

															const formData = new FormData();
															formData.append(
																'file',
																e?.target?.files?.[0] as File
															);
															startLoading(async () => {
																await handleSafeActionResponse({
																	action:
																		uploadPostContentImageAction(formData),
																	successMessage: 'Image uploaded',
																	errorMessage: 'Error uploading image',
																	onSuccess({ id, url }) {
																		form.setValue('img', url);
																		form.setValue('id', id);
																	},
																});
															});
														}}
													/>
												</FormControl>
											)}

											<FormMessage />
										</FormItem>
									)}
								/>

								<p>Or</p>

								<div className='flex flex-col space-y-1'>
									<Button type='button' variant={'outline'} disabled>
										Search uploaded images
									</Button>
									<FormDescription>Working on this feature</FormDescription>
								</div>
							</div>

							<FormField
								control={form.control}
								name='alt'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Alt Text</FormLabel>
										<Input
											type='text'
											placeholder='Image Alt Text'
											{...field}
										/>
										<FormMessage />
									</FormItem>
								)}
							/>

							<div className='grid gap-2'>
								<Button disabled={loading}>Add Image</Button>
							</div>
						</FormProvider>
					</PopoverContent>
				</Popover>
			</Tooltip>
		</TooltipProvider>
	);
};
