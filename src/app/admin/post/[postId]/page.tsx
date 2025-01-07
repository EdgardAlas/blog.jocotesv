import { PostForm } from '@/app/admin/post/_containers/post-form';
import { AdminTitle } from '@/components/ui/admin-title';
import { getInitialValuesUseCase } from '@/use-cases/post.use-case';
import { notFound } from 'next/navigation';

interface EditPostPageProps {
	params: Promise<{
		postId: string;
	}>;
}

const EditPostPage = async ({ params }: EditPostPageProps) => {
	const { postId } = await params;
	const data = await getInitialValuesUseCase(postId);

	if (!data) {
		return notFound();
	}

	return (
		<>
			<AdminTitle title='Edit Post' description='Edit an existing post' />

			<PostForm initialValues={data} />
		</>
	);
};

export default EditPostPage;
