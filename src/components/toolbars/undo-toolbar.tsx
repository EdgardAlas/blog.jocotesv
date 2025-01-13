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
import { Undo } from 'lucide-react';

export const UndoToolbar = () => {
	const { editor } = useToolbar();
	const isActive = useEditorActive('undo');

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Toggle
						variant={'outline'}
						pressed={isActive}
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
