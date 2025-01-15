import { PublicHeader } from '@/app/[locale]/(public)/_components/public-header';
import { LangLoader } from '@/components/ui/lang-loader';
import { I18nProviderClient } from '@/locales/client';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'JocoteSV Blog',
	description: 'Discover insightful articles on web development and design',
};

export default async function PublicLayout({
	params,
	children,
}: {
	params: Promise<{ locale: string }>;
	children: React.ReactNode;
}) {
	const { locale } = await params;
	return (
		<I18nProviderClient locale={locale} fallback={<LangLoader />}>
			<PublicHeader />
			<main className='container mx-auto px-4 py-8'>{children}</main>
		</I18nProviderClient>
	);
}
