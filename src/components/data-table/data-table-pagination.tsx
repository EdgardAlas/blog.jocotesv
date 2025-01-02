'use client';

import {
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { parseAsInteger, useQueryState } from 'nuqs';
import { useTransition } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export interface DataTablePaginationProps {
	totalPages: number;
	pageSizeOptions?: number[];
	defaultPageSize?: number;
}

export function DataTablePagination({
	totalPages = 0,
	pageSizeOptions = [10, 20, 50, 100],
	defaultPageSize = 10,
}: DataTablePaginationProps) {
	const [isLoading, startTransition] = useTransition();

	const [page, setPage] = useQueryState(
		'page',
		parseAsInteger.withDefault(1).withOptions({
			shallow: false,
			startTransition,
		})
	);

	const [size, setSize] = useQueryState(
		'size',
		parseAsInteger
			.withDefault(defaultPageSize)
			.withOptions({ shallow: false, startTransition })
	);

	return (
		<div className='mt-3 flex w-full flex-col-reverse items-center justify-between gap-4 overflow-auto p-1 sm:flex-row sm:gap-8 md:min-h-10'>
			<div className='flex-1 whitespace-nowrap text-sm text-muted-foreground'>
				{page} of {totalPages} pages
			</div>
			<div className='flex flex-col-reverse items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8'>
				<div className='flex items-center space-x-2'>
					<p className='whitespace-nowrap text-sm font-medium'>Rows per page</p>
					<Select
						value={size.toString()}
						disabled={isLoading}
						onValueChange={(value) => {
							setSize(parseInt(value, 10));
						}}
					>
						<SelectTrigger className='h-8 w-[4.5rem]'>
							<SelectValue placeholder={size.toString()} />
						</SelectTrigger>
						<SelectContent side='top'>
							{pageSizeOptions.map((pageSize) => (
								<SelectItem key={pageSize} value={`${pageSize}`}>
									{pageSize}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				<div className='flex items-center justify-center text-sm font-medium'>
					Page {page} of {totalPages}
				</div>
				<div className='flex items-center space-x-2'>
					<Button
						aria-label='Go to first page'
						variant='outline'
						className='hidden size-8 p-0 lg:flex'
						onClick={() => {
							setPage(1);
						}}
						disabled={page === 1 || isLoading}
					>
						<ChevronsLeft className='size-4' aria-hidden='true' />
					</Button>
					<Button
						aria-label='Go to previous page'
						variant='outline'
						size='icon'
						className='size-8'
						onClick={() => {
							setPage(page - 1);
						}}
						disabled={page === 1 || isLoading}
					>
						<ChevronLeft className='size-4' aria-hidden='true' />
					</Button>
					<Button
						aria-label='Go to next page'
						variant='outline'
						size='icon'
						className='size-8'
						onClick={() => {
							setPage(page + 1);
						}}
						disabled={page === totalPages || isLoading}
					>
						<ChevronRight className='size-4' aria-hidden='true' />
					</Button>
					<Button
						aria-label='Go to last page'
						variant='outline'
						size='icon'
						className='hidden size-8 lg:flex'
						onClick={() => {
							if (page === totalPages) {
								return;
							}

							setPage(totalPages);
						}}
						disabled={page === totalPages || isLoading}
					>
						<ChevronsRight className='size-4' aria-hidden='true' />
					</Button>
				</div>
			</div>
		</div>
	);
}

export const DataTablePaginationSkeleton = () => (
	<Skeleton className='mt-3 h-10 w-full' />
);
