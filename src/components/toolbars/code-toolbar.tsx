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
import { Code2 } from 'lucide-react';

export const CodeToolbar = () => {
	const { editor } = useToolbar();
	const isActive = useEditorActive('codeBlock');

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Toggle
						variant={'outline'}
						pressed={isActive}
						onPressedChange={() => {
							editor?.chain().focus().toggleCodeBlock().run();
						}}
					>
						<Code2 />
					</Toggle>
				</TooltipTrigger>
				<TooltipContent>Code block</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};
