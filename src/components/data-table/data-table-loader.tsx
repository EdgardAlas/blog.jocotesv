import { DataTable } from '@/components/data-table/data-table';
import { Pagination } from '@/components/pagination/pagination';
import { ColumnDef } from '@tanstack/react-table';

interface DataTableLoader<TData, TValue> {
	asyncData: () => Promise<WithPagination<TData>>;
	columns: ColumnDef<TData, TValue>[];
}

export const TableLoader = async <TData, TValue>({
	asyncData,
	columns,
}: DataTableLoader<TData, TValue>) => {
	const data = await asyncData();
	return (
		<>
			<DataTable columns={columns} data={data.data} />
			<Pagination totalPages={data.totalPages} />
		</>
	);
};
