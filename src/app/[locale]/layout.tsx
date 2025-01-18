import { LangLoader } from '@/components/ui/lang-loader';
import { I18nProviderClient } from '@/locales/client';
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
		</I18nProviderClient>
	);
};

export default PublicLayout;
