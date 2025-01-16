import { NotFound } from '@/components/not-found';
import { getScopedI18n } from '@/locales/server';

export default async function NotFoundPage() {
	const t = await getScopedI18n('notFound');
	return (
		<NotFound
			home='/'
			translation={{
				description: t('description'),
				goBack: t('goBack'),
				title: t('title'),
				home: t('home'),
			}}
		/>
	);
}
