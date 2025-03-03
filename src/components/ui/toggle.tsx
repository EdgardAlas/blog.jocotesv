'use client';

import * as React from 'react';
import * as TogglePrimitive from '@radix-ui/react-toggle';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const toggleVariants = cva('toggle-button', {
	variants: {
		variant: {
			default: 'bg-transparent',
			outline:
				'border border-input bg-transparent shadow-sm hover:bg-primary/80 hover:text-accent',
		},
		size: {
			default: 'h-9 px-2 min-w-9',
			sm: 'h-8 px-1.5 min-w-8',
			lg: 'h-10 px-2.5 min-w-10',
		},
	},
	defaultVariants: {
		variant: 'default',
		size: 'default',
	},
});

const Toggle = React.forwardRef<
	React.ElementRef<typeof TogglePrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
		VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
	<TogglePrimitive.Root
		ref={ref}
		className={cn(toggleVariants({ variant, size, className }))}
		{...props}
	/>
));

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle, toggleVariants };
