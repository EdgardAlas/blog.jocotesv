import { PublicHeader } from '@/app/(public)/_components/public-header';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'JocoteSV Blog',
	description: 'Discover insightful articles on web development and design',
};

export default function PublicLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<PublicHeader />
			<main>{children}</main>
		</>
	);
}