'use client';

import { PostClasificationFields } from '@/app/admin/post/_containers/post-clasification-fields';
import { PostGeneralFields } from '@/app/admin/post/_containers/post-general-fields';
import { PostSeoFields } from '@/app/admin/post/_containers/post-seo-fields';
import { savePostAction } from '@/app/admin/post/_lib/post.actions';
import {
	PostFormSchemaResolver,
	SavePostSchema,
} from '@/app/admin/post/_lib/post.schema';
import { FormProvider } from '@/components/form-provider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Editor } from '@/components/ui/editor';
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { handleSafeActionResponse } from '@/lib/handle-safe-action-response';
import { Save } from 'lucide-react';
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
}

const tabFields = {
	general: ['status', 'title', 'slug', 'featured', 'publicationDate'],
	seo: ['description', 'image'],
	classification: ['categories', 'author'],
};

export const PostForm = ({ initialValues }: PostFormProps) => {
	const form = useForm({
		defaultValues: initialValues,
		resolver: PostFormSchemaResolver,
	});
	const [loading, startTransition] = useTransition();

	const [activeTab, setActiveTab] = useState('general');

	const router = useRouter();

	return (
		<>
			<FormProvider
				form={form}
				onSubmit={async (values) => {
					if (loading) return;

					startTransition(async () => {
						await handleSafeActionResponse({
							action: savePostAction(values),
							loadingMessage: 'Saving post...',
							successMessage: 'Post saved',
							onSuccess() {
								router.push(`/admin/posts`);
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
							<CardHeader className='pb-0' />
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
		</>
	);
};
