import { useToolbar } from '@/components/toolbars/toolbar-provider';
import { Toggle } from '@/components/ui/toggle';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import { AlignRight } from 'lucide-react';

export const AlignRightToolbar = () => {
	const { editor } = useToolbar();

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Toggle
						variant={'outline'}
						pressed={editor?.isActive({ textAlign: 'right' })}
						onPressedChange={() => {
							editor?.chain().focus().setTextAlign('right').run();
						}}
					>
						<AlignRight />
					</Toggle>
				</TooltipTrigger>
				<TooltipContent>Align Right</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};
