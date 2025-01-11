'use client';
import { useHeaderShadow } from '@/app/admin/(dashboard)/_hooks/use-header-shadow';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';

export const PublicHeader = () => {
	const hasShadow = useHeaderShadow();
	return (
		<header
			className={cn('sticky top-0 z-10 bg-accent py-4 shadow-sm', {
				'shadow-md': hasShadow,
			})}
		>
			<nav className='container mx-auto flex items-center justify-between px-4'>
				<Link href='/' className='text-2xl font-bold'>
					JocoteSV
				</Link>
				<ul className='flex space-x-4'>
					<li>
						<Link href='/' className='hover:text-primary'>
							Home
						</Link>
					</li>
					<li>
						<Link href='/posts' className='hover:text-primary'>
							All Posts
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
};
