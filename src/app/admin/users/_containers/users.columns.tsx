'use client';

import { CrudTableOptions } from '@/components/ui/crud-table-options';
import { UserRow } from '@/types/users';
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
		cell({}) {
			return (
				<CrudTableOptions
					/* 	getEditData={() =>
						new Promise((resolve) =>
							setTimeout(() => {
								resolve(original);
							}, 1000)
						)
					} */
					deleteData={() => {
						return new Promise((resolve) => setTimeout(resolve, 1000));
					}}
				/>
			);
		},
	},
];
