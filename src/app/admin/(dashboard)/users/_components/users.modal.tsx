'use client';

import { useUsersModal } from '@/app/admin/(dashboard)/users/hooks/use-users-modal';
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
import { PasswordInput } from '@/components/ui/password-input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { useCrudModalStore } from '@/context/crud-modal.context';
import { Save } from 'lucide-react';

export const UserModal = () => {
	const { data } = useCrudModalStore();
	const { form, RESET_VALUES, loading, onSubmit } = useUsersModal();

	return (
		<CrudModal
			title='User'
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

			<FormField
				name='email'
				control={form.control}
				render={({ field }) => (
					<FormItem>
						<FormLabel>Email</FormLabel>
						<FormControl>
							<Input type='email' {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			{data?.canBeDeleted && (
				<FormField
					name='role'
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Role</FormLabel>
							<FormControl>
								<Select value={field.value} onValueChange={field.onChange}>
									<SelectTrigger>
										<SelectValue placeholder='Select a role' />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='admin'>Admin</SelectItem>
										<SelectItem value='editor'>Editor</SelectItem>
									</SelectContent>
								</Select>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			)}

			<FormField
				name='password'
				control={form.control}
				render={({ field }) => (
					<FormItem>
						<FormLabel>Password</FormLabel>
						<FormControl>
							<PasswordInput {...field} />
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
