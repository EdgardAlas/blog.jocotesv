'use client';

import { useSelectedLayoutSegments } from 'next/navigation';
import { SidebarTrigger } from '@/components/ui/sidebar';

function getHeaderTitle(segments: string[]): string {
	if (segments.length === 0) return 'Dashboard';

	const titles: { [key: string]: string } = {
		'(home)': 'Dashboard',
		posts: 'Posts',
		settings: 'Settings',
		users: 'User Management',
	};

	const lastSegment = segments[segments.length - 1];
	return titles[lastSegment] || 'Blog Admin Panel';
}

export const AdminTitle = () => {
	const segments = useSelectedLayoutSegments();
	const headerTitle = getHeaderTitle(segments);

	return (
		<header className='bg-background'>
			<div className='flex items-center'>
				<div className='md:hidden'>
					<SidebarTrigger />
				</div>
				<h1 className='ml-4 text-lg font-semibold md:ml-0'>{headerTitle}</h1>
			</div>
		</header>
	);
};
