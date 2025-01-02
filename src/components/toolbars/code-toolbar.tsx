import { useToolbar } from '@/components/toolbars/toolbar-provider';
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

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Toggle
						variant={'outline'}
						pressed={editor?.isActive('codeBlock')}
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
