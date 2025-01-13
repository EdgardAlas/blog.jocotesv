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
import { List } from 'lucide-react';

export const BulletListToolbar = () => {
	const { editor } = useToolbar();
	const isActive = useEditorActive('bulletList');

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Toggle
						variant={'outline'}
						pressed={isActive}
						onPressedChange={() => {
							editor?.chain().focus().toggleBulletList().run();
						}}
					>
						<List />
					</Toggle>
				</TooltipTrigger>
				<TooltipContent>Bullet List</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};
