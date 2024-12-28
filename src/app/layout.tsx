import type { Metadata } from 'next';
import { Lato } from 'next/font/google';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import './globals.css';

const fontFamily = Lato({
	weight: ['100', '300', '400', '700', '900'],
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'JocoteSV Blog',
	description: 'A blog about software development and technology',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={`${fontFamily.className} antialiased`}>
				<NuqsAdapter>{children}</NuqsAdapter>
			</body>
		</html>
	);
}
