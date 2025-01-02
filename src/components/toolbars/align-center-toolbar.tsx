import { useToolbar } from '@/components/toolbars/toolbar-provider';
import { Toggle } from '@/components/ui/toggle';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import { AlignCenter } from 'lucide-react';

export const AlignCenterToolbar = () => {
	const { editor } = useToolbar();

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Toggle
						variant={'outline'}
						pressed={editor?.isActive({ textAlign: 'center' })}
						onPressedChange={() => {
							editor?.chain().focus().setTextAlign('center').run();
						}}
					>
						<AlignCenter />
					</Toggle>
				</TooltipTrigger>
				<TooltipContent>Align Center</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};
