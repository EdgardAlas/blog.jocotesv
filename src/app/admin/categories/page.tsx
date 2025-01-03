import { categoriesColumns } from '@/app/admin/categories/_containers/categories.columns';
import { CategoryModal } from '@/app/admin/categories/_containers/categories.modal';
import { DataTableLoader } from '@/components/data-table/data-table-loader';
import { SearchInputSuspense } from '@/components/search-input/search-input-suspense';
import { AddItemCrudButton } from '@/components/ui/add-item-crud-button';
import { AdminTitle } from '@/components/ui/admin-title';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { getPaginatedCategoriesUseCase } from '@/use-cases/categories.use-case';

type CategoriesPageProps = NextPageWithPagination;

const CategoriesPage = async ({ searchParams }: CategoriesPageProps) => {
	const { search, page, size } = await searchParams;

	return (
		<>
			<AdminTitle
				title='Categories'
				description='Here you can manage the categories of the blog.'
			>
				<AddItemCrudButton autoFocus>Add Category</AddItemCrudButton>
			</AdminTitle>

			<Card>
				<CardHeader className='pb-0' />
				<CardContent>
					<SearchInputSuspense />
					<DataTableLoader
						key={`${page}-${size}-${search}`}
						columns={categoriesColumns}
						promise={() =>
							getPaginatedCategoriesUseCase(
								Number(page) || 1,
								Number(size) || 10,
								search
							)
						}
					/>
				</CardContent>
			</Card>

			<CategoryModal />
		</>
	);
};

export default CategoriesPage;
