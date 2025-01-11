import { PostCard } from '@/app/(public)/_components/post-card';
import { PostCardType } from '@/app/(public)/_types/post-card';
import React from 'react';

export const PostList = ({
	posts,
	title,
}: {
	posts: PostCardType[];
	title: string;
}) => (
	<section>
		<h2 className='mb-6 text-2xl font-bold'>{title}</h2>
		<div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
			{posts.map((post) => (
				<PostCard key={post.id} post={post} />
			))}
		</div>
	</section>
);
