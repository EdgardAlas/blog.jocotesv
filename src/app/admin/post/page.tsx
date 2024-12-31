'use client';

import { AdminTitle } from '@/components/ui/admin-title';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import DatePicker from '@/components/ui/date-picker';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import SelectBox from '@/components/ui/select-box';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { RefreshCw, Save, X } from 'lucide-react';
import { useState } from 'react';
import { useForm, useFormContext } from 'react-hook-form';

/* 
	The height of the ScrollArea component is set to 100vh minus the height of the header, the title with the description, the two CardHeader components, the CardContent components, the gap between the two cards, and the padding of the Card components.
*/

const STATUS = [
	{ label: 'Draft', value: 'draft' },
	{ label: 'Published', value: 'published' },
];

const AddPostPage = () => {
	const form = useForm({
		defaultValues: {
			id: '',
			title: '',
			content: '',
			featured: false,
			image: '',
			description: '',
			slug: '',
			status: 'draft',
			author: {
				value: '',
				label: '',
			},
			publishedAt: '',
			categories: [],
		},
	});

	const [activeTab, setActiveTab] = useState('general');

	return (
		<>
			<AdminTitle title='Add Post' description='Add a new post to the blog' />

			<Form {...form}>
				<div className='flex flex-col gap-4 xl:flex-row xl:items-start'>
					<Card className='order-2 flex-1 xl:order-1'>
						<ScrollArea className='xl:h-[calc(100vh-4rem-3.3125rem-3rem-0.875rem-0.25rem-0.125rem)]'>
							<CardHeader className='pb-0' />
							<CardContent></CardContent>
						</ScrollArea>
					</Card>

					<Card className='order-1 flex-1 xl:order-2 xl:max-w-sm'>
						<ScrollArea className='xl:h-[calc(100vh-4rem-3.3125rem-3rem-0.875rem-0.25rem-0.125rem)]'>
							<CardHeader className='pb-0' />
							<CardContent className='grid gap-2'>
								<Button className='w-full' icon={Save}>
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
										<TabsTrigger value='classification'>
											Classification
										</TabsTrigger>
									</TabsList>

									<PostGeneralFields />
									<PostSeoFields />
									<PostClasificationFields />
								</Tabs>
							</CardContent>
						</ScrollArea>
					</Card>
				</div>
			</Form>
		</>
	);
};

export default AddPostPage;

const options = [
	{ value: 'One', label: 'One' },
	{ value: 'Two', label: 'Two' },
	{ value: 'Three', label: 'Three' },
	{ value: 'Four', label: 'Four' },
	{ value: 'Five', label: 'Five' },
	{ value: 'Six', label: 'Six' },
	{ value: 'Seven', label: 'Seven' },
	{ value: 'Eight', label: 'Eight' },
	{ value: 'Nine', label: 'Nine' },
	{ value: 'Ten', label: 'Ten' },
	{ value: 'Eleven', label: 'Eleven' },
	{ value: 'Twelve', label: 'Twelve' },
	{ value: 'Thirteen', label: 'Thirteen' },
	{ value: 'Fifteen', label: 'Fifteen' },
];

const PostGeneralFields = () => {
	const form = useFormContext();

	return (
		<TabsContent value='general' className='space-y-3'>
			<FormField
				control={form.control}
				name='status'
				render={({ field }) => (
					<FormItem>
						<FormLabel>Status</FormLabel>
						<FormControl>
							<Select value={field.value} onValueChange={field.onChange}>
								<SelectTrigger>
									<SelectValue placeholder='Select Status' />
								</SelectTrigger>
								<SelectContent>
									{STATUS.map((status) => (
										<SelectItem key={status.value} value={status.value}>
											{status.label}
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
									{...field}
								/>
							</FormControl>
							<Button type='button' size={'sm'} icon={RefreshCw}>
								Generate
							</Button>
						</div>
						<FormMessage />
						<FormDescription>
							Slug is the URL-friendly version of the title. It is usually all
							lowercase and contains only letters, numbers, and hyphens.
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
				name='publishedAt'
				render={({ field }) => (
					<FormItem>
						<FormLabel>Published At</FormLabel>
						<FormControl>
							<DatePicker value={field.value} onChange={field.onChange} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</TabsContent>
	);
};

const PostSeoFields = () => {
	const form = useFormContext();

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
								<img src={field.value} alt='Post Image' />
								<Button
									className='absolute right-1 top-1'
									size={'icon'}
									variant={'ghost'}
									onClick={() => {
										form.setValue('image', '');
									}}
								>
									<X className='text-primary' />
								</Button>
							</div>
						) : (
							<FormControl>
								<Input
									type='file'
									accept='image/*'
									ref={field.ref}
									onChange={(e) => {
										const file = e.target.files?.[0];
										if (file) {
											form.setValue('image', URL.createObjectURL(file));
										}
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

const PostClasificationFields = () => {
	const form = useFormContext();

	return (
		<TabsContent value='classification' className='space-y-3'>
			<FormField
				control={form.control}
				name='categories'
				render={({ field }) => (
					<FormItem>
						<FormLabel>Categories</FormLabel>
						<FormControl>
							<SelectBox
								placeholder='Select Categories'
								value={field.value}
								onSearch={async (searchTerm) => {
									const filteredOptions = options.filter((option) =>
										option.label
											.toLowerCase()
											.includes(searchTerm.toLowerCase())
									);
									await new Promise((resolve) => setTimeout(resolve, 500));
									return Promise.resolve(filteredOptions);
								}}
								onChange={field.onChange}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<FormField
				control={form.control}
				name='author'
				render={({ field }) => (
					<FormItem>
						<FormLabel>Author*</FormLabel>
						<FormControl>
							<SelectBox
								placeholder='Select Author'
								value={field.value}
								onSearch={async (searchTerm) => {
									const filteredOptions = options.filter((option) =>
										option.label
											.toLowerCase()
											.includes(searchTerm.toLowerCase())
									);
									await new Promise((resolve) => setTimeout(resolve, 500));
									return Promise.resolve(filteredOptions);
								}}
								onChange={field.onChange}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</TabsContent>
	);
};
