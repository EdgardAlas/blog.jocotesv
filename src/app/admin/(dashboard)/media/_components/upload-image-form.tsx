/* eslint-disable @next/next/no-img-element */
'use client';

import { useUploadImageForm } from '@/app/admin/(dashboard)/media/_hooks/use-upload-form';
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Upload, X } from 'lucide-react';

export const UploadImageForm = () => {
	const { form, uploading, localUrl, onSubmit, FOLDERS } = useUploadImageForm();

	return (
		<CrudModal
			form={form}
			onSubmit={onSubmit}
			title='Media'
			openModal={'upload'}
		>
			<FormField
				control={form.control}
				name='folder'
				render={({ field }) => (
					<FormItem>
						<FormLabel>Status</FormLabel>
						<FormControl>
							<Select value={field.value} onValueChange={field.onChange}>
								<SelectTrigger>
									<SelectValue placeholder='Select folder' />
								</SelectTrigger>
								<SelectContent>
									{FOLDERS.map((folder) => (
										<SelectItem key={folder.value} value={folder.value}>
											{folder.label}
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
				name='image'
				control={form.control}
				render={({ field }) => (
					<FormItem>
						<FormLabel>Image</FormLabel>
						{field.value ? (
							<div className='relative w-full'>
								<img
									src={localUrl}
									alt='Post Image'
									className='w-full object-cover'
								/>
								<Button
									className='absolute right-1 top-1'
									size={'icon'}
									variant={'ghost'}
									loading={uploading}
									icon={X}
									onClick={() => {
										field.onChange(null);
									}}
								/>
							</div>
						) : (
							<FormControl>
								<Input
									type='file'
									accept='image/*'
									ref={field.ref}
									onChange={(e) => {
										field.onChange(e.target?.files?.[0]);
									}}
								/>
							</FormControl>
						)}
						<FormMessage />
					</FormItem>
				)}
			/>
			<Button
				type='submit'
				className='w-full'
				icon={Upload}
				loading={uploading}
			>
				Upload
			</Button>
		</CrudModal>
	);
};
