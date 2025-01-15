import { Loader2 } from 'lucide-react';

export const LangLoader = () => {
	return (
		<div className='fixed inset-0 flex items-center justify-center bg-background'>
			<div className='text-center'>
				<Loader2 className='mx-auto h-12 w-12 animate-spin text-primary' />
				<h2 className='mt-4 text-xl font-semibold text-foreground'>JocoteSV</h2>
			</div>
		</div>
	);
};
