'use client';

import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

export default function Error({
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<div className='flex min-h-[calc(100vh-4rem-1rem)] items-center justify-center bg-background'>
			<div className='max-w-md space-y-6 p-6 text-center'>
				<div className='flex justify-center'>
					<AlertCircle className='h-16 w-16 text-destructive' />
				</div>
				<h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>
					500 - Server Error
				</h1>
				<p className='text-muted-foreground'>
					{`We're sorry, but something went wrong on our end. Our team has been
								notified and we're working to fix the issue.`}
				</p>
				<div className='flex justify-center space-x-4'>
					<Button onClick={() => reset()} variant='default'>
						Try again
					</Button>
				</div>
			</div>
		</div>
	);
}
