import { authorsColumns } from '@/app/admin/(dashboard)/authors/_components/authors.columns';
import { AuthorsModal } from '@/app/admin/(dashboard)/authors/_components/authors.modal';
import { TableLoader } from '@/components/data-table/data-table-loader';
import { TableSekeleton } from '@/components/data-table/data-table-skeleton';
import { PaginationSuspense } from '@/components/pagination/pagination-suspense';
import { SearchInputSuspense } from '@/components/search-input/search-input-suspense';
import { AddItemCrudButton } from '@/components/ui/add-item-crud-button';
import { AdminTitle } from '@/components/ui/admin-title';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { findPaginatedAuthorsUseCase } from '@/use-cases/authors.use-case';
import { Suspense } from 'react';

type AuthorsPageProps = NextPageWithPagination;

const AuthorsPage = async ({ searchParams }: AuthorsPageProps) => {
	const { search, page, size } = await searchParams;

	return (
		<>
			<AdminTitle
				title='Authors'
				description='Here you can manage authors for every post.'
			>
				<AddItemCrudButton autoFocus>Add Author</AddItemCrudButton>
			</AdminTitle>

			<Card>
				<CardHeader />
				<CardContent>
					<SearchInputSuspense />

					<Suspense
						key={`${page}-${size}-${search}`}
						fallback={<TableSekeleton />}
					>
						<TableLoader
							columns={authorsColumns}
							asyncData={() =>
								findPaginatedAuthorsUseCase(
									Number(page) || 1,
									Number(size) || 10,
									search
								)
							}
						/>
					</Suspense>

					<PaginationSuspense />
				</CardContent>
			</Card>

			<AuthorsModal />
		</>
	);
};

export default AuthorsPage;
