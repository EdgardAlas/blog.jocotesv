import { useToolbar } from '@/components/toolbars/toolbar-provider';
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

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Toggle
						variant={'outline'}
						pressed={editor?.isActive('strike')}
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
