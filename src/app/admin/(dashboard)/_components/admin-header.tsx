'use client';

import { UserDropdown } from '@/app/admin/(dashboard)/_components/admin-user-dropdown';
import { useHeaderShadow } from '@/app/admin/(dashboard)/_hooks/use-header-shadow';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { capitalize } from '@/helpers/capitalize';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { Fragment } from 'react';

export const AdminHeader = () => {
	const hasShadow = useHeaderShadow();
	const paths = usePathname();
	const pathNames = paths.split('/').filter(Boolean);

	return (
		<header
			className={cn(
				'sticky top-0 z-10 flex w-full items-center justify-between bg-background p-4',
				{ 'shadow-md': hasShadow }
			)}
		>
			<div className='flex items-center gap-2'>
				<SidebarTrigger />
				<Breadcrumb>
					<BreadcrumbList>
						{pathNames.map((path, index) => {
							const route = `/${pathNames.slice(0, index + 1).join('/')}`;
							return (
								<Fragment key={index}>
									<BreadcrumbItem>
										<BreadcrumbLink href={route}>
											{capitalize(path)}
										</BreadcrumbLink>
									</BreadcrumbItem>
									{index < pathNames.length - 1 && <BreadcrumbSeparator />}
								</Fragment>
							);
						})}
					</BreadcrumbList>
				</Breadcrumb>
			</div>
			<UserDropdown />
		</header>
	);
};
