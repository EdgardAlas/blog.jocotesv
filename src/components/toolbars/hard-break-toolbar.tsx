import { useToolbar } from '@/components/toolbars/toolbar-provider';
import { Toggle } from '@/components/ui/toggle';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import { WrapText } from 'lucide-react';

export const HardBreakToolbar = () => {
	const { editor } = useToolbar();

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Toggle
						variant={'outline'}
						pressed={editor?.isActive('hardBreak')}
						onPressedChange={() => {
							editor?.chain().focus().setHardBreak().run();
						}}
					>
						<WrapText />
					</Toggle>
				</TooltipTrigger>
				<TooltipContent>Hard break</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};
