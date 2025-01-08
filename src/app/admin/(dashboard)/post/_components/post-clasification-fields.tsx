'use client';

import { autoCompleteAuthorsByNameAction } from '@/app/admin/(dashboard)/authors/_lib/authors.actions';
import { autoCompleteCategoriesByNameAction } from '@/app/admin/(dashboard)/categories/_lib/categories.actions';
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import SelectBox from '@/components/ui/select-box';
import { TabsContent } from '@/components/ui/tabs';
import { useFormContext } from 'react-hook-form';
import { toast } from 'sonner';

export const PostClasificationFields = () => {
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
								multiple
								placeholder='Select Categories'
								value={field.value}
								onSearch={async (searchTerm) => {
									const filteredOptions =
										await autoCompleteCategoriesByNameAction(searchTerm);

									if (filteredOptions?.serverError) {
										toast.error("Couldn't fetch categories");
										return [];
									}

									if (!filteredOptions?.data) {
										return [];
									}

									return filteredOptions?.data;
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
									const filteredOptions =
										await autoCompleteAuthorsByNameAction(searchTerm);

									if (filteredOptions?.serverError) {
										toast.error("Couldn't fetch authors");
										return [];
									}

									if (!filteredOptions?.data) {
										return [];
									}

									return filteredOptions?.data;
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
