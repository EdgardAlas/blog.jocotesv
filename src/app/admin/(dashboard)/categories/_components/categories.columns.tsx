'use client';

import {
	deleteCategoryAction,
	getCategoryByIdAction,
} from '@/app/admin/(dashboard)/categories/_lib/categories.actions';
import { CrudTableOptions } from '@/components/ui/crud-table-options';
import { CategoryRow } from '@/app/admin/(dashboard)/categories/_types/categories';
import { ColumnDef } from '@tanstack/react-table';

export const categoriesColumns: ColumnDef<CategoryRow>[] = [
	{
		header: 'Name',
		accessorKey: 'name',
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
					getEditData={() => getCategoryByIdAction(original.id)}
					deleteData={() => deleteCategoryAction(original.id)}
				/>
			);
		},
	},
];
