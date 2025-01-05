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
import { navItems } from '@/config/nav-items';
import { hasPermission, Role } from '@/config/roles';
import { LogOut } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
