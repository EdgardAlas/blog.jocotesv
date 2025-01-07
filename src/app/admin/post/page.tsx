import { PostForm } from '@/app/admin/post/_containers/post-form';
import { AdminTitle } from '@/components/ui/admin-title';
import { getInitialValuesUseCase } from '@/use-cases/post.use-case';

const AddPostPage = async () => {
	const data = await getInitialValuesUseCase();

	if (!data) {
		throw new Error('Error getting initial values');
	}

	return (
		<>
			<AdminTitle title='Add Post' description='Add a new post to the blog' />

			<PostForm initialValues={data} />
		</>
	);
};

export default AddPostPage;
