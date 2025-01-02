'use client';

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
					getEditData={() =>
						new Promise((resolve) =>
							setTimeout(() => {
								resolve(original);
							}, 1000)
						)
					}
					deleteData={() => {
						return new Promise((resolve) => setTimeout(resolve, 1000));
					}}
				/>
			);
		},
	},
];
