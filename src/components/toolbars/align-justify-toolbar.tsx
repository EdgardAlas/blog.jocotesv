import { useToolbar } from '@/components/toolbars/toolbar-provider';
import { Toggle } from '@/components/ui/toggle';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import { AlignJustifyIcon } from 'lucide-react';

export const AlignJustifyToolbar = () => {
	const { editor } = useToolbar();

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Toggle
						variant={'outline'}
						pressed={editor?.isActive({ textAlign: 'justify' })}
						onPressedChange={() => {
							editor?.chain().focus().setTextAlign('justify').run();
						}}
					>
						<AlignJustifyIcon />
					</Toggle>
				</TooltipTrigger>
				<TooltipContent>Align Justify</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};
