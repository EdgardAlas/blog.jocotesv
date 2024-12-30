import { useConfirm } from '@/components/ui/confirm-dialog';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useCrudModalStore } from '@/context/crud-modal.context';
import { EllipsisVertical } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';

interface CrudTableOptionsProps {
	children?: React.ReactNode;
	getEditData?: () => Promise<unknown>;
	deleteData?: () => Promise<unknown>;
}

export const CrudTableOptions = ({
	children,
	getEditData,
	deleteData,
}: CrudTableOptionsProps) => {
	const confirm = useConfirm();
	const { setData, setOpen } = useCrudModalStore();
	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<EllipsisVertical />
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem
					onClick={async () => {
						const loadingId = toast.loading('Loading...');

						if (getEditData) {
							const data = await getEditData();
							setData(data);
							setOpen(true);

							toast.success('Data loaded', { id: loadingId });
							return;
						}

						toast.error('Edit data not provided', { id: loadingId });
					}}
				>
					Edit
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={async () => {
						const confirmDelete = await confirm({
							title: 'Delete',
							description: 'Are you sure you want to delete this data?',
						});

						if (!confirmDelete) return;

						const loadingId = toast.loading('Loading...');

						if (deleteData) {
							await deleteData();

							toast.success('Data deleted', { id: loadingId });
							return;
						}

						toast.error('Delete data not provided', { id: loadingId });
					}}
				>
					Delete
				</DropdownMenuItem>

				{children}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
