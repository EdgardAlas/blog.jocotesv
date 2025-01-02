import { useToolbar } from '@/components/toolbars/toolbar-provider';
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

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Toggle
						variant={'outline'}
						pressed={editor?.isActive('bulletList')}
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
