'use client';

import { useCategoriesModal } from '@/app/admin/(dashboard)/categories/_hooks/use-categories-moda';
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
import { Save } from 'lucide-react';

export const CategoryModal = () => {
	const { form, loading, onSubmit, RESET_VALUES } = useCategoriesModal();

	return (
		<CrudModal
			title='Category'
			form={form}
			resetValues={RESET_VALUES}
			onSubmit={onSubmit}
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
