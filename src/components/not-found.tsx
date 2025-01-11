'use client';

import { Button } from '@/components/ui/button';
import { ArrowLeft, Home } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const NotFound = ({ home }: { home: string }) => {
	const router = useRouter();

	return (
		<div className='flex min-h-[calc(100dvh-4rem)] flex-col items-center justify-center bg-gray-100 p-6 dark:bg-gray-900'>
			<div className='space-y-6 text-center'>
				<h1 className='text-6xl font-bold text-gray-800 dark:text-gray-200'>
					404
				</h1>
				<h2 className='text-3xl font-semibold text-gray-700 dark:text-gray-300'>
					Page Not Found
				</h2>
				<p className='max-w-md text-xl text-gray-600 dark:text-gray-400'>
					{"Oops! The page you're looking for doesn't exist or has been moved."}
				</p>
				<div className='flex flex-col justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0'>
					<Button
						onClick={() => router.back()}
						variant='outline'
						className='flex items-center space-x-2'
					>
						<ArrowLeft className='h-4 w-4' />
						<span>Go Back</span>
					</Button>
					<Button
						onClick={() => router.push(home)}
						className='flex items-center space-x-2'
					>
						<Home className='h-4 w-4' />
						<span>Home</span>
					</Button>
				</div>
			</div>
		</div>
	);
};
