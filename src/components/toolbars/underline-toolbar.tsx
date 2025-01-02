import { useToolbar } from '@/components/toolbars/toolbar-provider';
import { Toggle } from '@/components/ui/toggle';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import { UnderlineIcon } from 'lucide-react';

export const UnderlineToolbar = () => {
	const { editor } = useToolbar();

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Toggle
						variant={'outline'}
						pressed={editor?.isActive('underline')}
						onPressedChange={() => {
							editor?.chain().focus().toggleUnderline().run();
						}}
					>
						<UnderlineIcon />
					</Toggle>
				</TooltipTrigger>
				<TooltipContent>Underline</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};
