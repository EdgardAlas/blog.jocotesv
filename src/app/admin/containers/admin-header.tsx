'use client';

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { getBreadcrumbs } from '@/config/breadcrumbs';
import { useSelectedLayoutSegments } from 'next/navigation';
import { Fragment } from 'react';

export const AdminHeader = () => {
	const segments = useSelectedLayoutSegments();
	const breadcrumbs = getBreadcrumbs(segments);

	return (
		<header className='sticky top-0 z-10 w-full bg-background p-4'>
			<div className='flex items-center gap-2'>
				<SidebarTrigger />
				<Breadcrumb>
					<BreadcrumbList>
						{breadcrumbs.map((breadcrumb, index) => (
							<Fragment key={index}>
								<BreadcrumbItem>
									<BreadcrumbLink href={breadcrumb.link}>
										{breadcrumb.name}
									</BreadcrumbLink>
								</BreadcrumbItem>
								{index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
							</Fragment>
						))}
					</BreadcrumbList>
				</Breadcrumb>
			</div>
		</header>
	);
};
