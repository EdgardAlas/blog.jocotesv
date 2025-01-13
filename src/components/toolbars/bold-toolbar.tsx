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
import { Bold } from 'lucide-react';

export const BoldToolbar = () => {
	const { editor } = useToolbar();
	const isActive = useEditorActive('bold');

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Toggle
						variant={'outline'}
						pressed={isActive}
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
