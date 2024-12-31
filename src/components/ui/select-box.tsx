'use client';
// inspired by: https://github.com/shadcn-ui/ui/issues/927#issuecomment-1727957151
import { CaretSortIcon, CheckIcon, Cross2Icon } from '@radix-ui/react-icons';
import * as React from 'react';

import { cn } from '@/lib/utils';

import {
	Command,
	CommandEmpty,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';

interface Option {
	value: string;
	label: string;
}

interface SelectBoxProps {
	value?: Option | Option[];
	onChange?: (values: Option | Option[]) => void;
	/*
		The function that will be called when the user types in the search input.
		This function should return a promise that resolves to an array of options.
	*/
	onSearch?: (searchTerm: string) => Promise<Option[]>;
	placeholder?: string;
	inputPlaceholder?: string;
	emptyPlaceholder?: string;
	className?: string;
	multiple?: boolean;
	clearLastSearchOnClose?: boolean;
}

const SelectBox = React.forwardRef<HTMLInputElement, SelectBoxProps>(
	(
		{
			inputPlaceholder,
			emptyPlaceholder,
			placeholder,
			className,
			/* options, */
			value,
			onChange,
			multiple,
			onSearch,
			clearLastSearchOnClose = true,
		},
		ref
	) => {
		const [searchTerm, setSearchTerm] = React.useState<string>('');
		const [isOpen, setIsOpen] = React.useState(false);
		const [options, setOptions] = React.useState<Option[]>([]);
		const [loading, setLoading] = React.useState(false);
		const debounceRef = React.useRef<NodeJS.Timeout>(null);

		const handleSelect = (selectedValue: Option) => {
			if (multiple && Array.isArray(value)) {
				const newValue = value.some((v) => v.value === selectedValue.value)
					? value.filter((v) => v.value !== selectedValue.value)
					: [...value, selectedValue];

				onChange?.(newValue);
			} else {
				onChange?.(selectedValue);
				setIsOpen(false);
				if (clearLastSearchOnClose) {
					setSearchTerm('');
					setOptions([selectedValue]);
				}
			}
		};

		const handleClear = () => {
			onChange?.(
				multiple
					? []
					: {
							value: '',
							label: '',
						}
			);
		};

		return (
			<>
				<Popover
					open={isOpen}
					onOpenChange={(state) => {
						setIsOpen(state);

						if (!state) {
							if (clearLastSearchOnClose) {
								setSearchTerm('');
								setOptions(Array.isArray(value) ? value : value ? [value] : []);
							}
							setLoading(false);
						}
					}}
				>
					<PopoverTrigger asChild>
						<div
							className={cn(
								'flex min-h-[36px] cursor-pointer items-center justify-between rounded-md border px-3 py-1 data-[state=open]:border-ring',
								className
							)}
						>
							<div
								className={cn(
									'items-center gap-1 overflow-hidden text-sm',
									multiple
										? 'flex flex-grow flex-wrap'
										: 'inline-flex whitespace-nowrap'
								)}
							>
								{(Array.isArray(value) && value.length > 0) ||
								(!Array.isArray(value) && value?.label) ? (
									Array.isArray(value) && value.length > 0 && multiple ? (
										value.map((option) => (
											<span
												key={option.value}
												className='inline-flex items-center gap-1 rounded-md border py-0.5 pl-2 pr-1 text-xs font-medium text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
											>
												<span>{option.label}</span>
												<span
													onClick={(e) => {
														e.preventDefault();
														handleSelect(option);
													}}
													className='flex items-center rounded-sm px-[1px] text-muted-foreground/60 hover:bg-accent hover:text-muted-foreground'
												>
													<Cross2Icon />
												</span>
											</span>
										))
									) : (
										!Array.isArray(value) && value.label
									)
								) : (
									<span className='mr-auto text-muted-foreground'>
										{placeholder}
									</span>
								)}
								{/* {placeholder} */}
							</div>
							<div className='flex items-center self-stretch pl-1 text-muted-foreground/60 hover:text-foreground [&>div]:flex [&>div]:items-center [&>div]:self-stretch'>
								{value &&
								((Array.isArray(value) && value.length > 0) ||
									(!Array.isArray(value) && value.label)) ? (
									<div
										onClick={(e) => {
											e.preventDefault();
											handleClear();
										}}
									>
										<Cross2Icon className='size-4' />
									</div>
								) : (
									<div>
										<CaretSortIcon className='size-4' />
									</div>
								)}
							</div>
						</div>
					</PopoverTrigger>
					<PopoverContent
						className='w-[var(--radix-popover-trigger-width)] p-0'
						align='start'
					>
						<Command shouldFilter={false}>
							<div className='relative'>
								<CommandInput
									value={searchTerm}
									onValueChange={async (e) => {
										setSearchTerm(e);

										if (debounceRef.current) {
											clearTimeout(debounceRef.current);
										}

										setLoading(true);
										setOptions([]);

										debounceRef.current = setTimeout(async () => {
											const results = await onSearch?.(e);
											setOptions(results ?? []);
											setLoading(false);
										}, 300);
									}}
									ref={ref}
									placeholder={inputPlaceholder ?? 'Search...'}
									className='h-9'
								/>
								{searchTerm && (
									<div
										className='absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 text-muted-foreground hover:text-foreground'
										onClick={() => setSearchTerm('')}
									>
										<Cross2Icon className='size-4' />
									</div>
								)}
							</div>
							<CommandList>
								<CommandEmpty>
									{loading
										? 'Loading...'
										: (emptyPlaceholder ?? 'No results found')}
								</CommandEmpty>

								{options.map((option) => {
									const isSelected =
										Array.isArray(value) &&
										value.some((v) => v.value === option.value);

									return (
										<CommandItem
											key={option.value}
											onSelect={() => handleSelect(option)}
										>
											{multiple && (
												<div
													className={cn(
														'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
														isSelected
															? 'bg-primary text-primary-foreground'
															: 'opacity-50 [&_svg]:invisible'
													)}
												>
													<CheckIcon />
												</div>
											)}
											<span>{option.label}</span>
											{!multiple &&
												!Array.isArray(value) &&
												option.value === value?.value && (
													<CheckIcon
														className={cn(
															'ml-auto',
															option.value === value.value
																? 'opacity-100'
																: 'opacity-0'
														)}
													/>
												)}
										</CommandItem>
									);
								})}
							</CommandList>
						</Command>
					</PopoverContent>
				</Popover>
			</>
		);
	}
);

SelectBox.displayName = 'SelectBox';

export default SelectBox;
