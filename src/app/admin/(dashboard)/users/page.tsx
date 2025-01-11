import { usersColumns } from '@/app/admin/(dashboard)/users/_components/users.columns';
import { UserModal } from '@/app/admin/(dashboard)/users/_components/users.modal';
import { TableLoader } from '@/components/data-table/data-table-loader';
import { TableSekeleton } from '@/components/data-table/data-table-skeleton';
import { SearchInput } from '@/components/search-input/search-input';
import { AddItemCrudButton } from '@/components/ui/add-item-crud-button';
import { AdminTitle } from '@/components/ui/admin-title';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { findPaginatedUsersUseCase } from '@/use-cases/users.use-case';
import { Suspense } from 'react';

type UsersPageProps = NextPageWithPagination;

const UsersPage = async ({ searchParams }: UsersPageProps) => {
	const { search, page, size } = await searchParams;

	return (
		<>
			<AdminTitle title='Users' description='Manage all users in the system'>
				<AddItemCrudButton openModal={'user'} autoFocus>
					Add User
				</AddItemCrudButton>
			</AdminTitle>

			<Card>
				<CardHeader className='pb-0' />
				<CardContent>
					<SearchInput />

					<Suspense
						key={`${page}-${size}-${search}`}
						fallback={<TableSekeleton />}
					>
						<TableLoader
							columns={usersColumns}
							asyncData={() =>
								findPaginatedUsersUseCase(
									Number(page) || 1,
									Number(size) || 10,
									search
								)
							}
						/>
					</Suspense>
				</CardContent>
			</Card>

			<UserModal />
		</>
	);
};

export default UsersPage;
