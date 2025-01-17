import { categoriesColumns } from '@/app/admin/(dashboard)/categories/_components/categories.columns';
import { CategoryModal } from '@/app/admin/(dashboard)/categories/_components/categories.modal';
import { TableLoader } from '@/components/data-table/data-table-loader';
import { TableSekeleton } from '@/components/data-table/data-table-skeleton';
import { SearchInput } from '@/components/search-input/search-input';
import { AddItemCrudButton } from '@/components/ui/add-item-crud-button';
import { AdminTitle } from '@/components/ui/admin-title';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { getPaginatedCategoriesUseCase } from '@/use-cases/categories/get-paginated-categories';
import { Suspense } from 'react';

type CategoriesPageProps = NextPageWithPagination;

const CategoriesPage = async ({ searchParams }: CategoriesPageProps) => {
	const { search, page, size } = await searchParams;

	return (
		<>
			<AdminTitle
				title='Categories'
				description='Here you can manage the categories of the blog.'
			>
				<AddItemCrudButton autoFocus openModal={'category'}>
					Add Category
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
							columns={categoriesColumns}
							asyncData={() =>
								getPaginatedCategoriesUseCase(
									Number(page) || 1,
									Number(size) || 10,
									search
								)
							}
						/>
					</Suspense>
				</CardContent>
			</Card>

			<CategoryModal />
		</>
	);
};

export default CategoriesPage;
