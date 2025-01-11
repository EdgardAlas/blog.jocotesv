import {
	PublicPostCard,
	PublicPostCardSkeleton,
} from '@/app/(public)/_components/public-post-card';
import { PublicPostCardType } from '@/app/(public)/_types/public-post-card';

export const PublicPostList = ({
	posts,
	title,
}: {
	posts: PublicPostCardType[];
	title: string;
}) => (
	<section>
		<h2 className='mb-6 text-2xl font-bold'>{title}</h2>
		<div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
			{posts.map((post) => (
				<PublicPostCard key={post.id} post={post} />
			))}
		</div>
	</section>
);

export const PublicPostCardListSkeleton = () => (
	<section>
		<h2 className='mb-6 text-2xl font-bold'>Loading...</h2>
		<div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
			<PublicPostCardSkeleton />
			<PublicPostCardSkeleton />
			<PublicPostCardSkeleton />
			<PublicPostCardSkeleton />
		</div>
	</section>
);
