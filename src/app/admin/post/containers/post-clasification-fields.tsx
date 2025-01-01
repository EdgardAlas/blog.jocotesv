'use client';

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
