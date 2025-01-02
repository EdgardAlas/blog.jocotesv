import { useToolbar } from '@/components/toolbars/toolbar-provider';
import { Toggle } from '@/components/ui/toggle';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import { ListOrdered } from 'lucide-react';

export const OrderedListToolbar = () => {
	const { editor } = useToolbar();

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Toggle
						variant={'outline'}
						pressed={editor?.isActive('orderedList')}
						onPressedChange={() => {
							editor?.chain().focus().toggleOrderedList().run();
						}}
					>
						<ListOrdered />
					</Toggle>
				</TooltipTrigger>
				<TooltipContent>Ordered List</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};
