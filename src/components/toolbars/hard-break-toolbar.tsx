import {
	useEditorActive,
	useToolbar,
} from '@/components/toolbars/toolbar-provider';
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
	const isActive = useEditorActive('hardBreak');

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Toggle
						variant={'outline'}
						pressed={isActive}
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
