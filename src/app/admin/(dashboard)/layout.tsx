import { AdminHeader } from '@/app/admin/(dashboard)/_components/admin-header';
import { AdminSidebar } from '@/app/admin/(dashboard)/_components/admin-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { currentUser } from '@/lib/current-user';
import React from 'react';

export default async function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const user = await currentUser();

	return (
		<SidebarProvider>
			<div className='flex h-screen w-full items-start bg-background'>
				<AdminSidebar userRole={user?.role || 'editor'} />
				<div className='flex w-full flex-col items-start'>
					<AdminHeader />
					<main className='flex w-full flex-1 flex-col gap-4 overflow-auto p-4 pt-0'>
						{children}
					</main>
				</div>
			</div>
		</SidebarProvider>
	);
}
