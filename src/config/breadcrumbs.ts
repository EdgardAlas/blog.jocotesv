export const breadcrumbs = {
	'(home)': [
		{
			name: 'Dashboard',
			link: '/admin',
		},
	],
	posts: [
		{
			name: 'Dashboard',
			link: '/admin',
		},
		{
			name: 'Posts',
			link: '/admin/posts',
		},
	],
	authors: [
		{
			name: 'Dashboard',
			link: '/admin',
		},
		{
			name: 'Authors',
			link: '/admin/authors',
		},
	],
	users: [
		{
			name: 'Dashboard',
			link: '/admin',
		},
		{
			name: 'Users',
			link: '/admin/users',
		},
	],
};

export const getBreadcrumbs = (
	segments: string[]
): { name: string; link: string }[] => {
	if (segments.length === 0) return breadcrumbs['(home)'];

	const lastSegment = segments[segments.length - 1];
	return breadcrumbs[lastSegment as keyof typeof breadcrumbs] || [];
};
