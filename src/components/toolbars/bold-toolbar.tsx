import { useToolbar } from '@/components/toolbars/toolbar-provider';
import { Toggle } from '@/components/ui/toggle';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import { Bold } from 'lucide-react';

export const BoldToolbar = () => {
	const { editor } = useToolbar();

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Toggle
						variant={'outline'}
						pressed={editor?.isActive('bold')}
						onPressedChange={() => {
							editor?.chain().focus().toggleBold().run();
						}}
					>
						<Bold />
					</Toggle>
				</TooltipTrigger>
				<TooltipContent>Bold</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};
