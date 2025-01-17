import { NewLangSwitch } from '@/app/admin/(dashboard)/post/_components/new-lang-switch';
import { PostForm } from '@/app/admin/(dashboard)/post/_components/post-form';
import { AdminTitle } from '@/components/ui/admin-title';
import { getInitialValuesUseCase } from '@/use-cases/posts';
import { notFound } from 'next/navigation';

interface EditPostPageProps {
	params: Promise<{
		postId: string;
	}>;
	searchParams: Promise<{
		lang?: string;
	}>;
}

const EditPostPage = async ({ params, searchParams }: EditPostPageProps) => {
	const { postId } = await params;
	const { lang = 'en' } = await searchParams;
	const data = await getInitialValuesUseCase(postId, lang);
	const newKey = Math.random();

	if (!data) {
		return notFound();
	}

	return (
		<>
			<AdminTitle title='Edit Post' description='Edit an existing post'>
				<NewLangSwitch />
			</AdminTitle>

			<PostForm initialValues={data} key={newKey} mode='edit' />
		</>
	);
};

export default EditPostPage;
