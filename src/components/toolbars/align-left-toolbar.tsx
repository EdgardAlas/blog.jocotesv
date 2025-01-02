import { useToolbar } from '@/components/toolbars/toolbar-provider';
import { Toggle } from '@/components/ui/toggle';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import { AlignLeft } from 'lucide-react';

export const AlignLeftToolbar = () => {
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
						<AlignLeft />
					</Toggle>
				</TooltipTrigger>
				<TooltipContent>Align Right</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};
