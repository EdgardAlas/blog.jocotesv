import { Button } from '@/components/ui/button';
import { getScopedI18n } from '@/locales/server';
import Link from 'next/link';
import React from 'react';

export const Hero = async () => {
	const t = await getScopedI18n('Home');

	return (
		<section className='mb-12 rounded-lg bg-primary px-4 py-20 text-center'>
			<h1 className='mb-4 text-3xl font-bold text-white md:text-5xl'>
				{t('banner.title')}
			</h1>
			<p className='mb-8 text-xl text-white'>{t('banner.subtitle')}</p>
			<Button asChild variant={'secondary'}>
				<Link href='/search'>{t('viewAll')}</Link>
			</Button>
		</section>
	);
};
