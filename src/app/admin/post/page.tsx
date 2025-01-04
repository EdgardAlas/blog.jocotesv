'use client';

import { PostForm } from '@/app/admin/post/_containers/post-form';
import { AdminTitle } from '@/components/ui/admin-title';

const AddPostPage = () => {
	return (
		<>
			<AdminTitle title='Add Post' description='Add a new post to the blog' />

			<PostForm
				initialValues={{
					id: '',
					title: '',
					content: '',
					featured: false,
					image: '',
					description: '',
					slug: '',
					status: 'draft',
					author: {
						value: '',
						label: '',
					},
					publicationDate: '',
					categories: [],
				}}
			/>
		</>
	);
};

export default AddPostPage;
