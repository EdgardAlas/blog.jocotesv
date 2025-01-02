'use client';

import { useToolbar } from '@/components/toolbars/toolbar-provider';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { FormProvider } from '@/components/form-provider';

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
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { LinkIcon } from 'lucide-react';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
	url: z.string().url({ message: 'Please enter a valid URL' }),
	text: z.string().min(1, { message: 'Link text is required' }),
	newTab: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

export function LinkToolbar() {
	const [open, setOpen] = React.useState(false);
	const { editor } = useToolbar();
	const formRef = React.useRef<HTMLFormElement>(null);

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			url: '',
			text: '',
			newTab: false,
		},
	});

	function onSubmit(data: FormValues) {
		form.reset();

		if (!data.url || !data.text) {
			editor.chain().focus().extendMarkRange('link').unsetLink().run();
			setOpen(false);
			return;
		}

		try {
			editor
				.chain()
				.focus()
				.extendMarkRange('link')
				.setLink({
					href: data.url,
					target: data.newTab ? '_blank' : undefined,
					rel: data.newTab ? 'noopener noreferrer' : undefined,
				})
				.command(({ tr }) => {
					tr.insertText(data.text);
					return true;
				})
				.run();
		} catch (error) {
			console.error(error);
		} finally {
			setOpen(false);
		}
	}

	return (
		<TooltipProvider>
			<Tooltip>
				<Popover
					open={open}
					onOpenChange={(state) => {
						const previousUrl = editor.getAttributes('link').href;
						const newTab = editor.getAttributes('link').target === '_blank';
						const { from } = editor.view.state.selection;
						const text = editor.state.doc.nodeAt(from);

						form.setValue('url', previousUrl);
						form.setValue('text', text?.text ?? '');
						form.setValue('newTab', newTab);
						setOpen(state);
					}}
				>
					<TooltipTrigger asChild>
						<PopoverTrigger asChild>
							<button
								aria-label='Create link'
								className={cn('toggle-button', {
									'!bg-primary text-accent': editor.isActive('link'),
								})}
							>
								<LinkIcon className='h-4 w-4' />
							</button>
						</PopoverTrigger>
					</TooltipTrigger>
					<TooltipContent>
						<p>Create a link</p>
					</TooltipContent>
					<PopoverContent className='w-80'>
						<FormProvider
							ref={formRef}
							form={form}
							onSubmit={onSubmit}
							className='flex flex-col gap-4'
						>
							<FormField
								control={form.control}
								name='url'
								render={({ field }) => (
									<FormItem>
										<FormLabel>URL</FormLabel>
										<FormControl>
											<Input placeholder='https://example.com' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='text'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Link Text</FormLabel>
										<FormControl>
											<Input placeholder='Enter link text' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='newTab'
								render={({ field }) => (
									<FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
										<FormControl>
											<Checkbox
												checked={field.value}
												onCheckedChange={field.onChange}
											/>
										</FormControl>
										<div className='space-y-1 leading-none'>
											<FormLabel>Open in new tab</FormLabel>
											<FormDescription>
												If checked, the link will open in a new tab when
												clicked.
											</FormDescription>
										</div>
									</FormItem>
								)}
							/>
							<Button type='submit' className='w-full'>
								Create Link
							</Button>
							{editor.isActive('link') && (
								<Button
									type='button'
									form='link-form'
									variant={'destructive'}
									onClick={() => {
										editor
											.chain()
											.focus()
											.extendMarkRange('link')
											.unsetLink()
											.run();
										setOpen(false);
									}}
									className='w-full'
								>
									Remove Link
								</Button>
							)}
						</FormProvider>
					</PopoverContent>
				</Popover>
			</Tooltip>
		</TooltipProvider>
	);
}
