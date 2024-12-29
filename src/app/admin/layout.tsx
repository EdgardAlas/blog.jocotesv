import { AdminHeader } from '@/app/admin/containers/admin-header';
import { AdminSidebar } from '@/app/admin/containers/admin-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Role } from '@/config/roles';
import React from 'react';

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const userRole: Role = 'superadmin';

	return (
		<SidebarProvider>
			<div className='flex h-screen w-full items-start bg-background'>
				<AdminSidebar userRole={userRole} />
				<div className='flex w-full flex-col items-start'>
					<AdminHeader />
					<main className='flex flex-1 flex-col justify-start gap-4 overflow-auto p-4 pt-0'>
						{children}
					</main>
				</div>
			</div>
		</SidebarProvider>
	);
}
