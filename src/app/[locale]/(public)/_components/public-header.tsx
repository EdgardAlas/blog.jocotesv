'use client';

import { useHeaderShadow } from '@/app/admin/(dashboard)/_hooks/use-header-shadow';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { locales } from '@/config/locales';
import { cn } from '@/lib/utils';
import {
	useChangeLocale,
	useCurrentLocale,
	useScopedI18n,
} from '@/locales/client';
import { Globe, Menu, X } from 'lucide-react';
import Form from 'next/form';
import Link from 'next/link';
import { useState, useTransition } from 'react';

export const PublicHeader = () => {
	const hasShadow = useHeaderShadow();
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const t = useScopedI18n('navbar');
	const locale = useCurrentLocale();

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
						<Link
							href={`/${locale}`}
							className='text-2xl font-bold text-gray-900'
						>
							JocoteSV
						</Link>
					</div>

					{/* Desktop Navigation */}
					<nav className='hidden items-center space-x-4 md:flex'>
						<Link href='/' className='text-gray-700 hover:text-gray-900'>
							{t('home')}
						</Link>

						<div>
							<Form action={'/search'} prefetch={false}>
								<Input placeholder={t('search')} name='search' />
							</Form>
						</div>

						<LocaleSwitcher />
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
				<div className='container mx-auto px-2 md:hidden'>
					<div className='space-y-2 px-2 pb-3 pt-2 sm:px-3'>
						<Link
							href='/'
							className='block text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900'
						>
							Home
						</Link>

						<div className='flex items-center gap-2'>
							<Form action={'/search'} prefetch={false} className='flex-1'>
								<Input placeholder={t('search')} name='search' />
							</Form>

							<LocaleSwitcher />
						</div>
					</div>
				</div>
			)}
		</header>
	);
};

export default function LocaleSwitcher() {
	const [isPending, startTransition] = useTransition();
	const changeLocale = useChangeLocale();
	const locale = useCurrentLocale();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild disabled={isPending}>
				<Button variant='outline' size='icon'>
					<Globe className='h-[1.2rem] w-[1.2rem]' />
					<span className='sr-only'>Switch language</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				{locales.map((loc) => (
					<DropdownMenuItem key={loc} asChild>
						<button
							className='w-full text-left'
							onClick={() => {
								startTransition(() => {
									changeLocale(loc);
								});
							}}
						>
							{loc.toUpperCase()}
							{loc === locale && <span className='ml-2 text-green-600'>✓</span>}
						</button>
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
