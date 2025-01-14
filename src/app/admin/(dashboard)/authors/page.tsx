import { authorsColumns } from '@/app/admin/(dashboard)/authors/_components/authors.columns';
import { AuthorsModal } from '@/app/admin/(dashboard)/authors/_components/authors.modal';
import { TableLoader } from '@/components/data-table/data-table-loader';
import { TableSekeleton } from '@/components/data-table/data-table-skeleton';
import { SearchInput } from '@/components/search-input/search-input';
import { AddItemCrudButton } from '@/components/ui/add-item-crud-button';
import { AdminTitle } from '@/components/ui/admin-title';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { getPaginatedAuthorsUseCase } from '@/use-cases/authors/get-paginated-authors';
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
				<AddItemCrudButton autoFocus openModal={'author'}>
					Add Author
				</AddItemCrudButton>
			</AdminTitle>

			<Card>
				<CardHeader />
				<CardContent>
					<SearchInput placeholder={'Search...'} />

					<Suspense
						key={`${page}-${size}-${search}`}
						fallback={<TableSekeleton />}
					>
						<TableLoader
							columns={authorsColumns}
							asyncData={() =>
								getPaginatedAuthorsUseCase(
									Number(page) || 1,
									Number(size) || 10,
									search
								)
							}
						/>
					</Suspense>
				</CardContent>
			</Card>

			<AuthorsModal />
		</>
	);
};

export default AuthorsPage;
