import { useConfirm } from '@/components/ui/confirm-dialog';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useCrudModalStore } from '@/context/crud-modal.context';
import { handleSafeActionResponse } from '@/lib/handle-safe-action-response';
import { EllipsisVertical } from 'lucide-react';
import { SafeActionResult } from 'next-safe-action';
import React from 'react';
import { toast } from 'sonner';

interface CrudTableOptionsProps {
	children?: React.ReactNode;
	getEditData?: () => Promise<
		SafeActionResult<TODO, TODO, TODO, TODO> | undefined
	>;
	deleteData?: () => Promise<
		SafeActionResult<TODO, TODO, TODO, TODO> | undefined
	>;

	successDeleteMessage?: string;
	successLoadMessage?: string;
	disableEdit?: boolean;
	disableDelete?: boolean;
}

export const CrudTableOptions = ({
	children,
	getEditData,
	deleteData,
	successLoadMessage,
	successDeleteMessage,
	disableEdit,
	disableDelete,
}: CrudTableOptionsProps) => {
	const confirm = useConfirm();
	const { setData, setOpen } = useCrudModalStore();
	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<EllipsisVertical />
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				{disableEdit ? null : (
					<DropdownMenuItem
						onClick={async () => {
							if (!getEditData) {
								toast.error('Edit data not provided');
								return;
							}

							await handleSafeActionResponse({
								action: getEditData(),
								successMessage:
									successLoadMessage || 'Data loaded successfully',
								loadingMessage: 'Loading...',
								onSuccess(data) {
									setData(data);
									setOpen(true);
								},
							});
						}}
					>
						Edit
					</DropdownMenuItem>
				)}
				{disableDelete ? null : (
					<DropdownMenuItem
						onClick={async () => {
							const confirmDelete = await confirm({
								title: 'Delete',
								description: 'Are you sure you want to delete this data?',
							});

							if (!confirmDelete) return;

							if (!deleteData) {
								toast.error('Delete data not provided');
								return;
							}

							await handleSafeActionResponse({
								action: deleteData(),
								successMessage:
									successDeleteMessage || 'Data deleted successfully',
								loadingMessage: 'Deleting...',
							});
						}}
					>
						Delete
					</DropdownMenuItem>
				)}
				{children}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
