'use client';
import { useHeaderShadow } from '@/app/admin/(dashboard)/_hooks/use-header-shadow';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import Form from 'next/form';

export const PublicHeader = () => {
	const hasShadow = useHeaderShadow();
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	return (
		<header
			className={cn('sticky top-0 z-10 bg-accent py-4 shadow-sm', {
				'shadow-md': hasShadow,
			})}
		>
			<div className='container mx-auto px-4'>
				<div className='flex items-center justify-between'>
					{/* Logo */}
					<div className='flex flex-shrink-0 items-center'>
						<Link href='/' className='text-2xl font-bold text-gray-900'>
							JocoteSV
						</Link>
					</div>

					{/* Desktop Navigation */}
					<nav className='hidden items-center space-x-4 md:flex'>
						<Link href='/' className='text-gray-700 hover:text-gray-900'>
							Home
						</Link>

						<div>
							<Form action={'/search'} prefetch={false}>
								<Input placeholder='Search...' name='search' />
							</Form>
						</div>
					</nav>

					{/* Mobile Menu Button */}
					<div className='md:hidden'>
						<Button
							variant='ghost'
							size='icon'
							onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
							aria-label='Toggle menu'
						>
							{isMobileMenuOpen ? (
								<X className='h-6 w-6' aria-hidden='true' />
							) : (
								<Menu className='h-6 w-6' aria-hidden='true' />
							)}
						</Button>
					</div>
				</div>
			</div>

			{/* Mobile Navigation */}
			{isMobileMenuOpen && (
				<div className='md:hidden'>
					<div className='space-y-2 px-2 pb-3 pt-2 sm:px-3'>
						<Link
							href='/'
							className='block text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900'
						>
							Home
						</Link>

						<Input placeholder='Search...' />
					</div>
				</div>
			)}
		</header>
	);
};
