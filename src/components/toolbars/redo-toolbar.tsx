import { useToolbar } from '@/components/toolbars/toolbar-provider';
import { Toggle } from '@/components/ui/toggle';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import { Redo } from 'lucide-react';

export const RedoToolbar = () => {
	const { editor } = useToolbar();

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Toggle
						variant={'outline'}
						pressed={editor?.isActive('redo')}
						disabled={!editor?.can().redo()}
						onPressedChange={() => {
							editor?.chain().focus().redo().run();
						}}
					>
						<Redo />
					</Toggle>
				</TooltipTrigger>
				<TooltipContent>Redo</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};
