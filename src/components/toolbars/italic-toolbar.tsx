import { useToolbar } from '@/components/toolbars/toolbar-provider';
import { Toggle } from '@/components/ui/toggle';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import { Italic } from 'lucide-react';

export const ItalicToolbar = () => {
	const { editor } = useToolbar();

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Toggle
						variant={'outline'}
						pressed={editor?.isActive('italic')}
						onPressedChange={() => {
							editor?.chain().focus().toggleItalic().run();
						}}
					>
						<Italic />
					</Toggle>
				</TooltipTrigger>
				<TooltipContent>Italic</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};
