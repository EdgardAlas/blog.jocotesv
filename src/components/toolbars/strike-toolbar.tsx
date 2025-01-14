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
import { Strikethrough } from 'lucide-react';

export const StrikeToolbar = () => {
	const { editor } = useToolbar();
	const isActive = useEditorActive('strike');

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Toggle
						variant={'outline'}
						pressed={isActive}
						onPressedChange={() => {
							editor?.chain().focus().toggleStrike().run();
						}}
					>
						<Strikethrough />
					</Toggle>
				</TooltipTrigger>
				<TooltipContent>Srtrike</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};
