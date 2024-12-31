'use client';

import { format } from 'date-fns';
import * as React from 'react';

import { Calendar } from '@/components/ui/calendar';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface DatePickerProps {
	ref?: React.Ref<HTMLButtonElement>;
	value?: Date | string | null;
	onChange?: (date: Date | null) => void;
}

export default function DatePicker({ value, onChange }: DatePickerProps) {
	const [date, setDate] = React.useState<Date | string | null | undefined>(
		value
	);

	return (
		<Popover>
			<PopoverTrigger asChild>
				<button
					ref={undefined}
					className={cn(
						'input-error flex h-9 w-full items-center rounded-md border border-input bg-accent px-3 py-1 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
						!date && 'text-muted-foreground'
					)}
				>
					{date ? format(date, 'PPP') : <span>Pick a date</span>}
				</button>
			</PopoverTrigger>
			<PopoverContent className='w-auto p-0' align='start'>
				<Calendar
					mode='single'
					selected={new Date(date as string) || undefined}
					onSelect={(date) => {
						if (!date) {
							setDate(undefined);
							onChange?.(null);
							return;
						}

						setDate(date);
						onChange?.(date);
					}}
					autoFocus
					startMonth={new Date(1999, 11)}
					endMonth={new Date(2025, 2)}
				/>
			</PopoverContent>
		</Popover>
	);
}
