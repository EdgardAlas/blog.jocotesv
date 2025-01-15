import { Hero } from '@/app/[locale]/(public)/(home)/_components/hero';
import { PublicPostList } from '@/app/[locale]/(public)/(home)/_components/public-post-list';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { getScopedI18n, getStaticParams } from '@/locales/server';
import { findHomePagePostsUseCase } from '@/use-cases/posts.use-case';
import { setStaticParamsLocale } from 'next-international/server';
import Link from 'next/link';

// Revalidate every 24 hours (86400 seconds)
export const revalidate = 86400;

export function generateStaticParams() {
	return getStaticParams();
}

export default async function HomePage({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	setStaticParamsLocale(locale);

	const data = await findHomePagePostsUseCase(locale);

	const t = await getScopedI18n('Home');

	return (
		<>
			<Hero />

			<Card>
				<CardHeader />
				<CardContent className='space-y-8 px-6 md:px-8'>
					{data.featuredPosts.length > 0 && (
						<PublicPostList
							posts={data.featuredPosts}
							title={t('featuredPosts')}
						/>
					)}

					{data.recentPosts.length > 0 ? (
						<PublicPostList posts={data.recentPosts} title={t('recentPosts')} />
					) : (
						<h2 className='text-center text-2xl font-bold'>
							{t('noRecentPosts')}
						</h2>
					)}

					<div className='mt-8 text-center'>
						<Button asChild variant='outline'>
							<Link href='/search'>{t('viewAll')}</Link>
						</Button>
					</div>
				</CardContent>
			</Card>
		</>
	);
}
