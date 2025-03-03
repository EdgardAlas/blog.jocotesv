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
import { AlignRight } from 'lucide-react';

export const AlignRightToolbar = () => {
	const { editor } = useToolbar();
	const isActive = useEditorActive({ textAlign: 'right' });

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Toggle
						variant={'outline'}
						pressed={isActive}
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
