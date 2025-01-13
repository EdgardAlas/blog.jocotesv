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
import { ListOrdered } from 'lucide-react';

export const OrderedListToolbar = () => {
	const { editor } = useToolbar();
	const isActive = useEditorActive('orderedList');

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Toggle
						variant={'outline'}
						pressed={isActive}
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
