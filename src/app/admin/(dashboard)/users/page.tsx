import { usersColumns } from '@/app/admin/(dashboard)/users/_components/users.columns';
import { UserModal } from '@/app/admin/(dashboard)/users/_components/users.modal';
import { TableLoader } from '@/components/data-table/data-table-loader';
import { TableSekeleton } from '@/components/data-table/data-table-skeleton';
import { PaginationSuspense } from '@/components/pagination/pagination-suspense';
import { SearchInputSuspense } from '@/components/search-input/search-input-suspense';
import { AddItemCrudButton } from '@/components/ui/add-item-crud-button';
import { AdminTitle } from '@/components/ui/admin-title';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { getPaginatedUsersUseCase } from '@/use-cases/users.use-case';
import { Suspense } from 'react';

type UsersPageProps = NextPageWithPagination;

const UsersPage = async ({ searchParams }: UsersPageProps) => {
	const { search, page, size } = await searchParams;

	return (
		<>
			<AdminTitle title='Users' description='Manage all users in the system'>
				<AddItemCrudButton>Add User</AddItemCrudButton>
			</AdminTitle>

			<Card>
				<CardHeader className='pb-0' />
				<CardContent>
					<SearchInputSuspense />

					<Suspense
						key={`${page}-${size}-${search}`}
						fallback={<TableSekeleton />}
					>
						<TableLoader
							columns={usersColumns}
							asyncData={() =>
								getPaginatedUsersUseCase(
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

			<UserModal />
		</>
	);
};

export default UsersPage;
