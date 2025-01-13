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
import { SeparatorHorizontal } from 'lucide-react';

export const HorizontalRuleToolbar = () => {
	const { editor } = useToolbar();
	const isActive = useEditorActive('horizontal_rule');

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Toggle
						variant={'outline'}
						pressed={isActive}
						onPressedChange={() => {
							editor?.chain().focus().setHorizontalRule().run();
						}}
					>
						<SeparatorHorizontal />
					</Toggle>
				</TooltipTrigger>
				<TooltipContent>Horizontal Rule</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};
