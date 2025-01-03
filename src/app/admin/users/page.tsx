import { usersColumns } from '@/app/admin/users/_containers/users.columns';
import { UserModal } from '@/app/admin/users/_containers/users.modal';
import { DataTableLoader } from '@/components/data-table/data-table-loader';
import { SearchInputSuspense } from '@/components/search-input/search-input-suspense';
import { AdminTitle } from '@/components/ui/admin-title';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { UserRow } from '@/types/users';

const getUsers = async (): Promise<WithPagination<UserRow>> => {
	await new Promise((resolve) => setTimeout(resolve, 1000));
	return {
		data: [],
		totalPages: 10,
	};
};

type UsersPageProps = NextPageWithPagination;

const UsersPage = async ({ searchParams }: UsersPageProps) => {
	const { search, page, size } = await searchParams;

	return (
		<>
			<AdminTitle title='Users' description='Manage all users in the system' />

			<Card>
				<CardHeader className='pb-0' />
				<CardContent>
					<SearchInputSuspense />
					<DataTableLoader
						key={`${page}-${size}-${search}`}
						columns={usersColumns}
						promise={getUsers}
					/>
				</CardContent>
			</Card>

			<UserModal />
		</>
	);
};

export default UsersPage;
