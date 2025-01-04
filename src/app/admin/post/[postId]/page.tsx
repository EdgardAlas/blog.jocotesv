'use client';

import { PostForm } from '@/app/admin/post/_containers/post-form';
import { AdminTitle } from '@/components/ui/admin-title';
import { formatDate } from '@/lib/format-dates';

const EditPostPage = () => {
	return (
		<>
			<AdminTitle title='Edit Post' description='Edit an existing post' />

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
					publicationDate: formatDate(new Date()).toDate(),
					categories: [],
				}}
			/>
		</>
	);
};

export default EditPostPage;
