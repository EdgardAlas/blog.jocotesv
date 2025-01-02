import { useToolbar } from '@/components/toolbars/toolbar-provider';
import { Toggle } from '@/components/ui/toggle';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import { Undo } from 'lucide-react';

export const UndoToolbar = () => {
	const { editor } = useToolbar();

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Toggle
						variant={'outline'}
						pressed={editor?.isActive('undo')}
						disabled={!editor?.can().undo()}
						onPressedChange={() => {
							editor?.chain().focus().undo().run();
						}}
					>
						<Undo />
					</Toggle>
				</TooltipTrigger>
				<TooltipContent>Undo</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};
