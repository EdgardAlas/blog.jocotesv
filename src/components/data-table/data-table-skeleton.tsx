'use client';

import { DataTable } from '@/components/data-table/data-table';
import { DataTablePaginationSkeleton } from '@/components/data-table/data-table-pagination';
import { Skeleton } from '@/components/ui/skeleton';

interface TableLoadingProps {
	size?: number;
}

export const DataTableSkeleton = ({ size }: TableLoadingProps) => {
	return (
		<>
			<DataTable
				columns={[
					{
						header: 'Loading...',
						accessorKey: 'loading',
						cell: () => <Skeleton className='h-4 w-full' />,
					},
				]}
				data={Array.from({ length: size ?? 5 }).map((_, index) => ({
					id: index,
					loading: '',
				}))}
			/>
			<DataTablePaginationSkeleton />
		</>
	);
};
