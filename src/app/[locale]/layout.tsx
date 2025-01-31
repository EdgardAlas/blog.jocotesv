import { LangLoader } from '@/components/ui/lang-loader';
import { I18nProviderClient } from '@/locales/client';
import Script from 'next/script';
import React from 'react';

const PublicLayout = async ({
	params,
	children,
}: {
	params: Promise<{ locale: string }>;
	children: React.ReactNode;
}) => {
	const { locale } = await params;

	return (
		<I18nProviderClient locale={locale} fallback={<LangLoader />}>
			{children}
			<Script src='https://analytics.jocotesv.com/script.js" data-website-id="99ddc07b-809b-4ef4-9b0e-11a3d7317f7f' />
		</I18nProviderClient>
	);
};

export default PublicLayout;
