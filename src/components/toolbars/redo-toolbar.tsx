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
import { Redo } from 'lucide-react';

export const RedoToolbar = () => {
	const { editor } = useToolbar();
	const isActive = useEditorActive('redo');

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Toggle
						variant={'outline'}
						pressed={isActive}
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
