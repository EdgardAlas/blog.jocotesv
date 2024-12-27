'use client';

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from '@/components/ui/sidebar';
import { hasPermission, Role } from '@/config/roles';
import {
	BarChart,
	BookOpen,
	Cog,
	FileText,
	LogOut,
	Settings,
	Tag,
	User,
	Users,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

type NavItem = {
	icon: React.ElementType;
	label: string;
	href: string;
	requiredRoles: Role[];
	subItems?: Omit<NavItem, 'subItems'>[];
};

const navItems: NavItem[] = [
	{
		icon: BarChart,
		label: 'Dashboard',
		href: '/admin',
		requiredRoles: ['editor', 'admin', 'superadmin'],
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
				href: '/admin/posts/authors',
				requiredRoles: ['admin'],
			},
			{
				icon: Tag,
				label: 'Categories',
				href: '/admin/posts/categories',
				requiredRoles: ['admin'],
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
				icon: Cog,
				label: 'General',
				href: '/admin/settings',
				requiredRoles: ['admin'],
			},
			{
				icon: Users,
				label: 'Users',
				href: '/admin/settings/users',
				requiredRoles: [],
			},
		],
	},
];

type AdminSidebarProps = {
	userRole: Role;
};

export const AdminSidebar = ({ userRole }: AdminSidebarProps) => {
	const { setOpenMobile } = useSidebar();
	const pathname = usePathname();
	return (
		<Sidebar>
			<SidebarHeader>
				<div className='p-4'>
					<h2 className='text-lg font-semibold'>Blog Admin</h2>
				</div>
			</SidebarHeader>
			<SidebarContent>
				{navItems.map((item) => {
					if (!hasPermission(userRole, item.requiredRoles)) return null;

					return (
						<SidebarGroup key={item.href}>
							<SidebarGroupLabel>{item.label}</SidebarGroupLabel>
							<SidebarGroupContent>
								<SidebarMenu>
									{item.subItems ? (
										item.subItems.map((subItem) => {
											if (!hasPermission(userRole, subItem.requiredRoles))
												return null;

											return (
												<SidebarMenuItem key={subItem.href}>
													<SidebarMenuButton
														asChild
														isActive={subItem.href === pathname}
													>
														<Link
															href={subItem.href}
															onClick={() => setOpenMobile(false)}
														>
															<subItem.icon className='mr-2 h-4 w-4' />
															{subItem.label}
														</Link>
													</SidebarMenuButton>
												</SidebarMenuItem>
											);
										})
									) : (
										<SidebarMenuItem>
											<SidebarMenuButton
												asChild
												isActive={item.href === pathname}
											>
												<Link
													href={item.href}
													onClick={() => setOpenMobile(false)}
												>
													<item.icon className='mr-2 h-4 w-4' />
													{item.label}
												</Link>
											</SidebarMenuButton>
										</SidebarMenuItem>
									)}
								</SidebarMenu>
							</SidebarGroupContent>
						</SidebarGroup>
					);
				})}
			</SidebarContent>

			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton asChild>
							<Link href='/admin/logout' className='w-full' prefetch={false}>
								<LogOut className='mr-2 h-4 w-4' />
								Logout
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
};
