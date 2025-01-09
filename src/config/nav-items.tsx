import { Role } from '@/config/roles';
import {
	BarChart,
	BookOpen,
	FileText,
	Image,
	Settings,
	Tag,
	User,
	Users,
} from 'lucide-react';

type NavItem = {
	icon: React.ElementType;
	label: string;
	href: string;
	requiredRoles: Role[];
	subItems?: Omit<NavItem, 'subItems'>[];
};

export const navItems: NavItem[] = [
	{
		icon: BarChart,
		label: 'Dashboard',
		href: '/admin',
		requiredRoles: ['editor', 'admin'],
	},
	{
		icon: FileText,
		label: 'Posts',
		href: '/admin/posts',
		requiredRoles: ['editor', 'admin'],
		subItems: [
			{
				icon: BookOpen,
				label: 'Posts',
				href: '/admin/posts',
				requiredRoles: ['editor', 'admin'],
			},
			{
				icon: User,
				label: 'Authors',
				href: '/admin/authors',
				requiredRoles: ['admin', 'editor'],
			},
			{
				icon: Tag,
				label: 'Categories',
				href: '/admin/categories',
				requiredRoles: ['admin', 'editor'],
			},
			{
				icon: Image,
				label: 'Media',
				href: '/admin/media',
				requiredRoles: ['admin', 'editor'],
			},
		],
	},
	{
		icon: Settings,
		label: 'Settings',
		href: '/admin/settings',
		requiredRoles: ['admin'],
		subItems: [
			{
				icon: Users,
				label: 'Users',
				href: '/admin/users',
				requiredRoles: ['admin'],
			},
		],
	},
];
