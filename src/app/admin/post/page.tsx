import { AdminTitle } from '@/components/ui/admin-title';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import React from 'react';

/* 
	The height of the ScrollArea component is set to 100vh minus the height of the header, the title with the description, the two CardHeader components, the CardContent components, the gap between the two cards, and the padding of the Card components.
*/

const AddPostPage = () => {
	return (
		<>
			<AdminTitle title='Add Post' description='Add a new post to the blog' />

			<div className='flex flex-col gap-4 xl:flex-row xl:items-start'>
				<Card className='order-2 flex-1 xl:order-1'>
					<ScrollArea className='xl:h-[calc(100vh-4rem-3.3125rem-3rem-0.875rem-0.25rem-0.125rem)]'>
						<CardHeader className='pb-0' />
						<CardContent></CardContent>
					</ScrollArea>
				</Card>

				<Card className='order-1 flex-1 xl:order-2 xl:max-w-sm'>
					<ScrollArea className='xl:h-[calc(100vh-4rem-3.3125rem-3rem-0.875rem-0.25rem-0.125rem)]'>
						<CardHeader className='pb-0' />
						<CardContent></CardContent>
					</ScrollArea>
				</Card>
			</div>
		</>
	);
};

export default AddPostPage;
