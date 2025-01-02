import { useToolbar } from '@/components/toolbars/toolbar-provider';
import { Toggle } from '@/components/ui/toggle';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import { Quote } from 'lucide-react';

export const BlockquoteToolbar = () => {
	const { editor } = useToolbar();

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Toggle
						variant={'outline'}
						pressed={editor?.isActive('blockquote')}
						onPressedChange={() => {
							editor?.chain().focus().toggleBlockquote().run();
						}}
					>
						<Quote />
					</Toggle>
				</TooltipTrigger>
				<TooltipContent>Blockquote</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};
