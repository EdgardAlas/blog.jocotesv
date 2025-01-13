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
import { AlignCenter } from 'lucide-react';

export const AlignCenterToolbar = () => {
	const { editor } = useToolbar();
	const isActive = useEditorActive({ textAlign: 'center' });

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Toggle
						variant={'outline'}
						pressed={isActive}
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
