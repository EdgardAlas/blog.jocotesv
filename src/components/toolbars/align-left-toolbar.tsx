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
import { AlignLeft } from 'lucide-react';

export const AlignLeftToolbar = () => {
	const { editor } = useToolbar();
	const isActive = useEditorActive({ textAlign: 'left' });

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Toggle
						variant={'outline'}
						pressed={isActive}
						onPressedChange={() => {
							editor?.chain().focus().setTextAlign('left').run();
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
