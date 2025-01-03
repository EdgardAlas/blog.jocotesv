'use client';

import { saveAuthorAction } from '@/app/admin/authors/_lib/authors.actions';
import {
	SaveAuthorResolver,
	SaveAuthorSchema,
} from '@/app/admin/authors/_lib/authors.schema';
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

const RESET_VALUES: z.infer<typeof SaveAuthorSchema> = {
	name: '',
	id: '',
};

export const AuthorsModal = () => {
	const { setOpen } = useCrudModalStore();
	const [loading, startTransition] = useTransition();

	const form = useForm<z.infer<typeof SaveAuthorSchema>>({
		defaultValues: RESET_VALUES,
		resolver: SaveAuthorResolver,
	});

	return (
		<CrudModal
			title='Author'
			form={form}
			resetValues={RESET_VALUES}
			onSubmit={async (values) => {
				if (loading) return;

				startTransition(async () => {
					await handleSafeActionResponse({
						action: saveAuthorAction(values),
						loadingMessage: 'Saving author...',
						successMessage: 'Author saved',
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
