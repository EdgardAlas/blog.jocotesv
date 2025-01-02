'use client';

import { UserDropdown } from '@/app/admin/_containers/admin-user-dropdown';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { getBreadcrumbs } from '@/config/breadcrumbs';
import { useScrollY } from '@/hooks/use-scroll-y';
import { cn } from '@/lib/utils';
import { useSelectedLayoutSegments } from 'next/navigation';
import { Fragment, useEffect, useState } from 'react';

export const AdminHeader = () => {
	const segments = useSelectedLayoutSegments();
	const breadcrumbs = getBreadcrumbs(segments);
	const hasShadow = useHeaderShadow();

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
			<UserDropdown />
		</header>
	);
};

const useHeaderShadow = () => {
	const [hasShadow, setHasShadow] = useState(false);

	const scrollY = useScrollY();

	useEffect(() => {
		const newHasShadow = scrollY > 0;

		if (hasShadow !== newHasShadow) {
			setHasShadow(newHasShadow);
		}
	}, [scrollY, hasShadow]);

	return hasShadow;
};
