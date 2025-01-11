'use client';

import { generateSlugAction } from '@/app/admin/(dashboard)/post/_lib/post.actions';
import { Button } from '@/components/ui/button';
import DatePicker from '@/components/ui/date-picker';
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { TabsContent } from '@/components/ui/tabs';
import { handleSafeActionResponse } from '@/lib/handle-safe-action-response';
import { RefreshCw } from 'lucide-react';
import { useTransition } from 'react';
import { useFormContext } from 'react-hook-form';
import { toast } from 'sonner';

export const PostGeneralFields = () => {
	const form = useFormContext();

	const [generatingSlug, startGeneratingSlug] = useTransition();

	const handleGenerateSlug = async () => {
		if (generatingSlug) {
			return;
		}

		const title = form.getValues('title');

		if (!title) {
			return toast.error('Please enter a title first.');
		}

		startGeneratingSlug(async () => {
			await handleSafeActionResponse({
				action: generateSlugAction({
					id: form.getValues('id'),
					title: title,
				}),
				loadingMessage: 'Generating slug...',
				successMessage: 'Slug generated successfully.',
				onSuccess: (data) => {
					form.setValue('slug', data);
					form.trigger('slug');
				},
			});
		});
	};

	return (
		<TabsContent
			value='general'
			className='space-y-3 rounded-md border border-gray-200 p-4'
		>
			<FormField
				control={form.control}
				name='title'
				render={({ field }) => (
					<FormItem>
						<FormLabel>Title*</FormLabel>
						<FormControl>
							<Input placeholder='Post Title' {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name='slug'
				render={({ field }) => (
					<FormItem className='flex-1'>
						<FormLabel>Slug*</FormLabel>
						<div className='flex items-center gap-2'>
							<FormControl>
								<Input
									type='text'
									className='w-full flex-1'
									placeholder='Post Slug'
									disabled={generatingSlug}
									{...field}
								/>
							</FormControl>
							<Button
								type='button'
								size={'sm'}
								icon={RefreshCw}
								loading={generatingSlug}
								onClick={handleGenerateSlug}
							>
								Generate
							</Button>
						</div>
						<FormMessage />
						<FormDescription>
							Slug is the URL-friendly version of the title. It is usually all
							lowercase and contains only letters, numbers, and hyphens. <br />
							Do not include starting or ending slashes (e.g., /slug/).
						</FormDescription>
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name='featured'
				render={({ field }) => (
					<FormItem className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
						<div className='space-y-0.5'>
							<FormLabel>Featured</FormLabel>
							<FormDescription>
								Featured posts are displayed first on the blog.
							</FormDescription>
						</div>
						<FormControl>
							<Switch checked={field.value} onCheckedChange={field.onChange} />
						</FormControl>
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name='publicationDate'
				render={({ field }) => (
					<FormItem>
						<FormLabel>Published At*</FormLabel>
						<FormControl>
							<DatePicker value={field.value} onChange={field.onChange} />
						</FormControl>
						<FormMessage />
						<FormDescription>
							This date will be shown on the post and used to order posts.
						</FormDescription>
						<FormDescription className='font-semibold'>
							This date is not used to schedule the post
						</FormDescription>
					</FormItem>
				)}
			/>
		</TabsContent>
	);
};
