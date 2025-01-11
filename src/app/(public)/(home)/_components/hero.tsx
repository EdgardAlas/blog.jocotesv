import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

export const Hero = () => {
	return (
		<section className='mb-12 rounded-lg bg-primary py-20 text-center'>
			<h1 className='mb-4 text-4xl font-bold text-white md:text-6xl'>
				Welcome to JocoteSV blog
			</h1>
			<p className='mb-8 text-xl text-white'>
				Discover insightful articles on web development and design
			</p>
			<Button asChild variant={'secondary'}>
				<Link href='/posts'>View All Posts</Link>
			</Button>
		</section>
	);
};
