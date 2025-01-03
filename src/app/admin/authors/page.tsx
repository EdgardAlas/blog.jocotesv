import { authorsColumns } from '@/app/admin/authors/_containers/authors.columns';
import { AuthorsModal } from '@/app/admin/authors/_containers/authors.modal';
import { DataTableLoader } from '@/components/data-table/data-table-loader';
import { SearchInputSuspense } from '@/components/search-input/search-input-suspense';
import { AddItemCrudButton } from '@/components/ui/add-item-crud-button';
import { AdminTitle } from '@/components/ui/admin-title';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { getPaginatedAuthorsUseCase } from '@/use-cases/authors';

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
				<CardHeader className='pb-0' />
				<CardContent>
					<SearchInputSuspense />
					<DataTableLoader
						key={`${page}-${size}-${search}`}
						columns={authorsColumns}
						promise={() =>
							getPaginatedAuthorsUseCase(
								Number(page) || 1,
								Number(size) || 10,
								search
							)
						}
					/>
				</CardContent>
			</Card>

			<AuthorsModal />
		</>
	);
};

export default AuthorsPage;
