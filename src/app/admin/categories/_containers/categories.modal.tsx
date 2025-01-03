'use client';

import { saveCategoryAction } from '@/app/admin/categories/_lib/categories.actions';
import {
	SaveCategoryResolver,
	SaveCategorySchema,
} from '@/app/admin/categories/_lib/categories.schema';
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
import { useCrudModalStore } from '@/context/crud-modal.context';
import { handleSafeActionResponse } from '@/lib/handle-safe-action-response';
import { Save } from 'lucide-react';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const RESET_VALUES: z.infer<typeof SaveCategorySchema> = {
	name: '',
	id: '',
};

export const CategoryModal = () => {
	const { setOpen } = useCrudModalStore();
	const [loading, startTransition] = useTransition();

	const form = useForm<z.infer<typeof SaveCategorySchema>>({
		defaultValues: RESET_VALUES,
		resolver: SaveCategoryResolver,
	});

	return (
		<CrudModal
			title='Category'
			form={form}
			onSubmit={async (values) => {
				if (loading) return;

				startTransition(async () => {
					await handleSafeActionResponse({
						action: saveCategoryAction(values),
						loadingMessage: 'Saving category...',
						successMessage: 'Category saved',
						onSuccess() {
							setOpen(false);
						},
					});
				});
			}}
		>
			<FormField
				name='name'
				control={form.control}
				render={({ field }) => (
					<FormItem>
						<FormLabel>Name</FormLabel>
						<FormControl>
							<Input {...field} autoFocus />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<Button type='submit' className='w-full' icon={Save} loading={loading}>
				Save
			</Button>
		</CrudModal>
	);
};
