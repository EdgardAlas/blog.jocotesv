'use client';

import { useToolbar } from '@/components/toolbars/toolbar-provider';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import {
	ChevronDown,
	Heading2,
	Heading3,
	Heading4,
	HeadingIcon,
	LucideIcon,
} from 'lucide-react';

const HEADINGS = [
	/* {
		tag: Heading1,
		id: 1,
	}, */
	{
		tag: Heading2,
		id: 2,
	},
	{
		tag: Heading3,
		id: 3,
	},
	{
		tag: Heading4,
		id: 4,
	},
];

interface ColorHighlightButtonProps {
	tag: LucideIcon;
	onClick: () => void;
}

const HeadingButton = ({ tag: Tag, onClick }: ColorHighlightButtonProps) => (
	<button
		onClick={onClick}
		className='hover:bg-gray-3 flex w-full items-center justify-between rounded-sm px-2 py-1 text-sm'
		type='button'
	>
		<div className='flex items-center space-x-2'>
			<Tag />
		</div>
	</button>
);

export const HeadingToolbar = () => {
	const { editor } = useToolbar();

	const handleSetHeading = (level: number) => {
		// @ts-expect-error - fix later
		editor?.chain().focus().toggleHeading({ level: level }).run();
	};

	const isDisabled =
		!editor?.can().chain().setHighlight().run() ||
		!editor?.can().chain().setColor('').run();

	const CurrentHeading = HEADINGS.find(({ id }) =>
		editor?.isActive('heading', { level: id })
	)?.tag;

	return (
		<Popover>
			<div className='relative h-full'>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<PopoverTrigger disabled={isDisabled} asChild>
								<button className='toggle-button'>
									{CurrentHeading ? <CurrentHeading /> : <HeadingIcon />}
									<ChevronDown />
								</button>
							</PopoverTrigger>
						</TooltipTrigger>
						<TooltipContent>Heading</TooltipContent>
					</Tooltip>
				</TooltipProvider>
				<PopoverContent align='start' className='dark:bg-gray-2 w-56 p-1'>
					<ScrollArea className='max-h-80 overflow-y-auto pr-2'>
						<div className='text-gray-11 mb-2.5 mt-2 px-2 text-xs'>
							Headings
						</div>
						{HEADINGS.map(({ id, tag }) => (
							<HeadingButton
								key={id}
								tag={tag}
								onClick={() => handleSetHeading(id)}
							/>
						))}
						<p className='text-gray-11 mt-2 px-2 text-xs'>
							Clicking the heading toggles it between a heading and a paragraph
						</p>
					</ScrollArea>
				</PopoverContent>
			</div>
		</Popover>
	);
};
