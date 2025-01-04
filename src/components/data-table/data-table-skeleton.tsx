'use client';

import { DataTable } from '@/components/data-table/data-table';
import { Skeleton } from '@/components/ui/skeleton';

interface TableLoadingProps {
	size?: number;
}

export const TableSekeleton = ({ size }: TableLoadingProps) => {
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
				data={Array.from({ length: size ?? 4 }).map((_, index) => ({
					id: index,
					loading: '',
				}))}
			/>
		</>
	);
};
