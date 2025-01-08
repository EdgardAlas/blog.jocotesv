'use client';

import { useLoginForm } from '@/app/admin/(auth)/login/_hooks/use-login-form';
import { FormProvider } from '@/components/form-provider';
import { Button } from '@/components/ui/button';
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import Link from 'next/link';

export const LoginForm = () => {
	const { form, onSubmit } = useLoginForm();

	return (
		<FormProvider className='space-y-4' onSubmit={onSubmit} form={form}>
			<FormField
				name='email'
				control={form.control}
				render={({ field }) => (
					<FormItem>
						<FormLabel>E-mail</FormLabel>
						<FormControl>
							<Input type='email' {...field} autoFocus />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<FormField
				name='password'
				control={form.control}
				render={({ field }) => (
					<FormItem>
						<div className='flex items-center justify-between'>
							<FormLabel>Password</FormLabel>
							<Link
								href='/forgot-password'
								className='font-medium text-indigo-600 hover:text-indigo-500'
								tabIndex={-1}
							>
								Forgot password?
							</Link>
						</div>
						<FormControl>
							<PasswordInput {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<div className='space-y-3'>
				<Button
					className='w-full'
					type='submit'
					loading={form.formState.isSubmitting}
				>
					Sign in
				</Button>
			</div>
		</FormProvider>
	);
};
