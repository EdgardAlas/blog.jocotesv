'use client';

import {
	deleteAuthorAction,
	getAuthorByIdAction,
} from '@/app/admin/(dashboard)/authors/_lib/authors.actions';
import { CrudTableOptions } from '@/components/ui/crud-table-options';
import { AuthorsRow } from '@/app/admin/(dashboard)/authors/_types/authors';
import { ColumnDef } from '@tanstack/react-table';

export const authorsColumns: ColumnDef<AuthorsRow>[] = [
	{
		header: 'Name',
		accessorKey: 'name',
	},
	/* {
		header: 'Image',
		accessorKey: 'image',
	}, */
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
					getEditData={() => getAuthorByIdAction(original.id)}
					deleteData={() => deleteAuthorAction(original.id)}
				/>
			);
		},
	},
];
