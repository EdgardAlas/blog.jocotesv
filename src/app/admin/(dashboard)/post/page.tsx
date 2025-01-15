import { NewLangSwitch } from '@/app/admin/(dashboard)/post/_components/new-lang-switch';
import { PostForm } from '@/app/admin/(dashboard)/post/_components/post-form';
import { AdminTitle } from '@/components/ui/admin-title';
import { getInitialValuesUseCase } from '@/use-cases/post.use-case';

interface AddPostPageProps {
	searchParams: Promise<{
		lang?: string;
	}>;
}

const AddPostPage = async ({ searchParams }: AddPostPageProps) => {
	const { lang = 'en' } = await searchParams;
	const data = await getInitialValuesUseCase(undefined, lang);

	if (!data) {
		throw new Error('Error getting initial values');
	}

	return (
		<>
			<AdminTitle
				title='Add Post'
				description={`Add a new post in ${lang.toUpperCase()}, save it and you can add more translations later.`}
			>
				<NewLangSwitch disabled />
			</AdminTitle>

			<PostForm initialValues={data} mode='add' />
		</>
	);
};

export default AddPostPage;
