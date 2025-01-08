/* eslint-disable @next/next/no-img-element */
'use client';

import {
	removePostSeoImageAction,
	uploadPostSeoImageAction,
} from '@/app/admin/(dashboard)/post/_lib/post.actions';
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
import { TabsContent } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { handleSafeActionResponse } from '@/lib/handle-safe-action-response';
import { X } from 'lucide-react';
import { useTransition } from 'react';
import { useFormContext } from 'react-hook-form';

export const PostSeoFields = () => {
	const form = useFormContext();
	const [loading, startLoading] = useTransition();

	return (
		<TabsContent value='seo' className='space-y-3'>
			<FormField
				control={form.control}
				name='description'
				render={({ field }) => (
					<FormItem>
						<FormLabel>Description*</FormLabel>
						<FormControl>
							<Textarea placeholder='Post Description' {...field} />
						</FormControl>
						<FormMessage />
						<FormDescription>
							Recommended length: 50-160 characters.
						</FormDescription>
					</FormItem>
				)}
			/>

			<FormField
				control={form.control}
				name='image'
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
												action: removePostSeoImageAction({
													url: field.value,
												}),
												successMessage: 'Image removed',
												errorMessage: 'Error removing image',
												onSuccess() {
													form.setValue('image', '');
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
										formData.append('file', e?.target?.files?.[0] as File);
										startLoading(async () => {
											await handleSafeActionResponse({
												action: uploadPostSeoImageAction(formData),
												successMessage: 'Image uploaded',
												errorMessage: 'Error uploading image',
												onSuccess(id) {
													form.setValue('image', id);
												},
											});
										});
									}}
								/>
							</FormControl>
						)}

						<FormMessage />
						<FormDescription>
							Recommended size: 1200x630 pixels.
						</FormDescription>
					</FormItem>
				)}
			/>
		</TabsContent>
	);
};
