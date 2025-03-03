'use client';

import {
	useEditorActiveAttributes,
	useToolbar,
} from '@/components/toolbars/toolbar-provider';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import { Check, ChevronDown } from 'lucide-react';

const TEXT_COLORS = [
	{ name: 'Default', color: 'var(--text-default)' },
	{ name: 'Gray', color: 'var(--text-gray)' },
	{ name: 'Brown', color: 'var(--text-brown)' },
	{ name: 'Orange', color: 'var(--text-orange)' },
	{ name: 'Yellow', color: 'var(--text-yellow)' },
	{ name: 'Green', color: 'var(--text-green)' },
	{ name: 'Blue', color: 'var(--text-blue)' },
	{ name: 'Purple', color: 'var(--text-purple)' },
	{ name: 'Pink', color: 'var(--text-pink)' },
	{ name: 'Red', color: 'var(--text-red)' },
];

const HIGHLIGHT_COLORS = [
	{ name: 'Default', color: 'var(--highlight-default)' },
	{ name: 'Gray', color: 'var(--highlight-gray)' },
	{ name: 'Brown', color: 'var(--highlight-brown)' },
	{ name: 'Orange', color: 'var(--highlight-orange)' },
	{ name: 'Yellow', color: 'var(--highlight-yellow)' },
	{ name: 'Green', color: 'var(--highlight-green)' },
	{ name: 'Blue', color: 'var(--highlight-blue)' },
	{ name: 'Purple', color: 'var(--highlight-purple)' },
	{ name: 'Pink', color: 'var(--highlight-pink)' },
	{ name: 'Red', color: 'var(--highlight-red)' },
];

interface ColorHighlightButtonProps {
	name: string;
	color: string;
	isActive: boolean;
	onClick: () => void;
	isHighlight?: boolean;
}

const ColorHighlightButton = ({
	name,
	color,
	isActive,
	onClick,
	isHighlight,
}: ColorHighlightButtonProps) => (
	<button
		onClick={onClick}
		className='hover:bg-gray-3 flex w-full items-center justify-between rounded-sm px-2 py-1 text-sm'
		type='button'
	>
		<div className='flex items-center space-x-2'>
			<div
				className='rounded-sm border px-1 py-px font-medium'
				style={isHighlight ? { backgroundColor: color } : { color }}
			>
				A
			</div>
			<span>{name}</span>
		</div>
		{isActive && <Check className='h-4 w-4' />}
	</button>
);

export const ColorHighlightToolbar = () => {
	const { editor } = useToolbar();
	const currentColor = useEditorActiveAttributes('textStyle');
	const currentHighlight = useEditorActiveAttributes('highlight');

	const handleSetColor = (color: string) => {
		editor
			?.chain()
			.focus()
			.setColor(color === currentColor.color ? '' : color)
			.run();
	};

	const handleSetHighlight = (color: string) => {
		editor
			?.chain()
			.focus()
			.setHighlight(
				color === currentHighlight.color ? { color: '' } : { color }
			)
			.run();
	};

	const isDisabled =
		!editor?.can().chain().setHighlight().run() ||
		!editor?.can().chain().setColor('').run();

	return (
		<Popover>
			<div className='relative h-full'>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<PopoverTrigger disabled={isDisabled} asChild>
								<button
									className={'toggle-button'}
									style={{
										color: currentColor.color,
									}}
								>
									<span className='text-md'>A</span>
									<ChevronDown />
								</button>
							</PopoverTrigger>
						</TooltipTrigger>
						<TooltipContent>Text Color & Highlight</TooltipContent>
					</Tooltip>
				</TooltipProvider>
				<PopoverContent align='start' className='dark:bg-gray-2 w-56 p-1'>
					<ScrollArea className='max-h-80 overflow-y-auto pr-2'>
						<div className='text-gray-11 mb-2.5 mt-2 px-2 text-xs'>Color</div>
						{TEXT_COLORS.map(({ name, color }) => (
							<ColorHighlightButton
								key={name}
								name={name}
								color={color}
								isActive={currentColor.color === color}
								onClick={() => handleSetColor(color)}
							/>
						))}

						<Separator className='my-3' />

						<div className='text-gray-11 mb-2.5 w-full px-2 pr-3 text-xs'>
							Background
						</div>
						{HIGHLIGHT_COLORS.map(({ name, color }) => (
							<ColorHighlightButton
								key={name}
								name={name}
								color={color}
								isActive={currentHighlight.color === color}
								onClick={() => handleSetHighlight(color)}
								isHighlight
							/>
						))}
					</ScrollArea>
				</PopoverContent>
			</div>
		</Popover>
	);
};
