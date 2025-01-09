'use client';

import {
	deleteUserAction,
	getUserByIdAction,
} from '@/app/admin/(dashboard)/users/_lib/users.actions';
import { UserRow } from '@/app/admin/(dashboard)/users/_types/users';
import { Badge } from '@/components/ui/badge';
import { CrudTableOptions } from '@/components/ui/crud-table-options';
import { roles } from '@/config/roles';
import { capitalize } from '@/helpers/capitalize';
import { cn } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';

export const usersColumns: ColumnDef<UserRow>[] = [
	{
		header: 'Name',
		accessorKey: 'name',
	},
	{
		header: 'Email',
		accessorKey: 'email',
	},
	{
		header: 'Role',
		accessorKey: 'role',
		cell(props) {
			return (
				<Badge
					className={cn({
						'bg-blue-500': props.row.original.role === roles.admin,
						'bg-green-500': props.row.original.role === roles.editor,
						'bg-red-500': props.row.original.role === roles.owner,
					})}
				>
					{capitalize(props.row.original.role)}
				</Badge>
			);
		},
	},
	{
		header: 'Created At',
		accessorKey: 'createdAt',
	},
	{
		header: 'Updated At',
		accessorKey: 'updatedAt',
	},
	{
		accessorKey: 'id',
		header: '',
		cell({ row: { original } }) {
			return (
				<CrudTableOptions
					getEditData={() => getUserByIdAction(original.id)}
					deleteData={() => deleteUserAction(original.id)}
					successDeleteMessage='User deleted successfully'
					successLoadMessage='User loaded successfully'
					disableDelete={!original.canBeDeleted}
				/>
			);
		},
	},
];
