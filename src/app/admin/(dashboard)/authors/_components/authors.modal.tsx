'use client';

import { useAuthorsModal } from '@/app/admin/(dashboard)/authors/_hooks/use-author-modal';
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

export const AuthorsModal = () => {
	const { form, loading, onSubmit, RESET_VALUES } = useAuthorsModal();

	return (
		<CrudModal
			title='Author'
			form={form}
			resetValues={RESET_VALUES}
			onSubmit={onSubmit}
			openModal={'author'}
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
