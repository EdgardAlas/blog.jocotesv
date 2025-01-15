'use client';

import { AuthorsModal } from '@/app/admin/(dashboard)/authors/_components/authors.modal';
import { CategoryModal } from '@/app/admin/(dashboard)/categories/_components/categories.modal';
import { PostClasificationFields } from '@/app/admin/(dashboard)/post/_components/post-clasification-fields';
import { PostGeneralFields } from '@/app/admin/(dashboard)/post/_components/post-general-fields';
import { PostSeoFields } from '@/app/admin/(dashboard)/post/_components/post-seo-fields';
import { savePostAction } from '@/app/admin/(dashboard)/post/_lib/post.actions';
import {
	PostFormSchemaResolver,
	SavePostSchema,
} from '@/app/admin/(dashboard)/post/_lib/post.schema';
import { FormProvider } from '@/components/form-provider';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useConfirm } from '@/components/ui/confirm-dialog';
import { Editor } from '@/components/ui/editor';
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { createConfettiExplosion } from '@/lib/confetti';
import { handleSafeActionResponse } from '@/lib/handle-safe-action-response';
import { Save, Terminal } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

/* 
	The height of the ScrollArea component is set to 100vh minus the height of the header, the title with the description, the two CardHeader components, the CardContent components, the gap between the two cards, and the padding of the Card components.
*/

interface PostFormProps {
	initialValues: z.infer<typeof SavePostSchema>;
	mode: 'add' | 'edit';
}

const tabFields = {
	general: ['status', 'title', 'slug', 'featured', 'publicationDate'],
	seo: ['description', 'image'],
	classification: ['categories', 'author'],
};

export const PostForm = ({ initialValues, mode }: PostFormProps) => {
	const form = useForm({
		defaultValues: initialValues,
		resolver: PostFormSchemaResolver,
	});
	const [loading, startTransition] = useTransition();

	const [activeTab, setActiveTab] = useState('general');

	const router = useRouter();

	const confirm = useConfirm();

	const id = form.watch('id');
	const lang = form.watch('lang');

	return (
		<>
			<FormProvider
				form={form}
				onSubmit={async (values) => {
					if (loading) return;

					const shouldSave = await confirm({
						title: 'Are you sure?',
						description: 'Are you sure you want to save the post?',
					});

					if (!shouldSave) return;

					startTransition(async () => {
						await handleSafeActionResponse({
							action: savePostAction(values),
							loadingMessage: 'Saving post...',
							successMessage: 'Post saved',
							onSuccess() {
								createConfettiExplosion();

								if (mode === 'edit') {
									return router.refresh();
								}

								router.push(`/admin/post/${values.slug}`);
							},
						});
					});
				}}
				onValidationError={(error) => {
					const firstKey = Object.keys(error)[0];

					const activeTab = Object.keys(tabFields).find((tab) =>
						tabFields[tab as keyof typeof tabFields].includes(firstKey)
					);

					if (activeTab) setActiveTab(activeTab);

					toast.error('Please check the form for errors.');
				}}
			>
				<div className='flex flex-col gap-4 xl:flex-row xl:items-start'>
					<Card className='order-2 flex-1 xl:order-1'>
						<div className='overflow-auto xl:max-h-[calc(100vh-4rem-3.3125rem-3rem-0.875rem-0.25rem-0.125rem)]'>
							<CardHeader>
								{lang !== 'en' && !id ? (
									<Alert>
										<Terminal className='h-4 w-4' />
										<AlertTitle>Translation {lang.toUpperCase()}</AlertTitle>
										<AlertDescription>
											This translation is not saved yet
										</AlertDescription>
									</Alert>
								) : null}
							</CardHeader>
							<CardContent>
								<FormField
									control={form.control}
									name='content'
									render={({ field }) => (
										<FormItem className='mx-auto max-w-[80ch]'>
											<FormLabel className='sr-only'>Content*</FormLabel>
											<FormControl>
												<Editor onChange={field.onChange} value={field.value} />
											</FormControl>
											<FormMessage />
											<FormDescription>
												The editor has a width of 80 inches, as this is the
												recommended width for optimal reading, matching how it
												will appear on the website.
											</FormDescription>
											<FormDescription>
												All post images and SEO images will not be deleted
												here,they will be deleted in the media section because
												you can use them in other posts.
											</FormDescription>
										</FormItem>
									)}
								/>
							</CardContent>
						</div>
					</Card>

					<Card className='order-1 flex-1 xl:order-2 xl:max-w-sm'>
						<div className='overflow-auto xl:h-[calc(100vh-4rem-3.3125rem-3rem-0.875rem-0.25rem-0.125rem)]'>
							<CardHeader className='pb-0' />
							<CardContent className='grid gap-2'>
								<Button className='w-full' icon={Save} loading={loading}>
									Save
								</Button>
								<FormField
									control={form.control}
									name='status'
									render={({ field }) => (
										<FormItem className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
											<div className='space-y-0.5'>
												<FormLabel>Publish Post</FormLabel>
												<FormDescription>
													If is enabled, the post will be visible to the public.
												</FormDescription>
											</div>
											<FormControl>
												<Switch
													checked={field.value === 'published'}
													onCheckedChange={(checked) => {
														field.onChange(checked ? 'published' : 'draft');
													}}
												/>
											</FormControl>
										</FormItem>
									)}
								/>
								<Tabs
									defaultValue='general'
									className='h-full w-full'
									value={activeTab}
									onValueChange={setActiveTab}
								>
									<TabsList className='flex space-x-4 border-b'>
										<TabsTrigger value='general'>General</TabsTrigger>
										<TabsTrigger value='seo'>SEO</TabsTrigger>
										<TabsTrigger value='classification'>Info</TabsTrigger>
									</TabsList>

									<PostGeneralFields />
									<PostSeoFields />
									<PostClasificationFields />
								</Tabs>
							</CardContent>
						</div>
					</Card>
				</div>
			</FormProvider>

			<CategoryModal />
			<AuthorsModal />
		</>
	);
};
