import { DataTable } from '@/components/data-table/data-table';
import {
	DataTablePagination,
	DataTablePaginationSkeleton,
} from '@/components/data-table/data-table-pagination';
import { DataTableSkeleton } from '@/components/data-table/data-table-skeleton';
import { ColumnDef } from '@tanstack/react-table';
import { Suspense } from 'react';

interface DataTableLoader<TData, TValue> {
	promise: () => Promise<WithPagination<TData>>;
	columns: ColumnDef<TData, TValue>[];
}

export const DataTableLoader = <TData, TValue>({
	promise,
	columns,
}: DataTableLoader<TData, TValue>) => {
	return (
		<Suspense fallback={<DataTableSkeleton />}>
			<Table promise={promise} columns={columns} />
		</Suspense>
	);
};

export const Table = async <TData, TValue>({
	promise,
	columns,
}: DataTableLoader<TData, TValue>) => {
	const data = await promise();
	return (
		<>
			<DataTable columns={columns} data={data.data} />

			<Suspense fallback={<DataTablePaginationSkeleton />}>
				<DataTablePagination totalPages={data.totalPages} />
			</Suspense>
		</>
	);
};
