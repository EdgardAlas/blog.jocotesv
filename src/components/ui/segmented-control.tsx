'use client';

import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { cn } from '@/lib/utils';

const SegmentedControl = React.forwardRef<
	React.ElementRef<typeof RadioGroupPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => (
	<RadioGroupPrimitive.Root
		className={cn(
			'inline-flex h-10 w-full items-center justify-center rounded-md border border-input bg-gray-50 p-1 text-primary',
			className
		)}
		{...props}
		ref={ref}
	/>
));
SegmentedControl.displayName = RadioGroupPrimitive.Root.displayName;

const SegmentedControlItem = React.forwardRef<
	React.ElementRef<typeof RadioGroupPrimitive.Item>,
	React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, children, ...props }, ref) => (
	<RadioGroupPrimitive.Item
		ref={ref}
		className={cn(
			'inline-flex flex-1 items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-accent data-[state=checked]:shadow-sm',
			className
		)}
		{...props}
	>
		{children}
	</RadioGroupPrimitive.Item>
));
SegmentedControlItem.displayName = RadioGroupPrimitive.Item.displayName;

export { SegmentedControl, SegmentedControlItem };
