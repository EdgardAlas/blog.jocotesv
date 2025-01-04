'use client';

import {
	deleteCategoryAction,
	getCategoryByIdAction,
} from '@/app/admin/categories/_lib/categories.actions';
import { CrudTableOptions } from '@/components/ui/crud-table-options';
import { CategoryRow } from '@/types/categories';
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
