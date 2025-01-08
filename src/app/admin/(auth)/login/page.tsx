import { LoginForm } from './_components/login-form';

const LoginPage = () => {
	return (
		<div className='space-y-6'>
			<div className='text-center'>
				<h1 className='text-2xl font-bold text-gray-900'>Welcome back</h1>
				<p className='mt-2 text-gray-500'>
					Please enter your details to sign in
				</p>
			</div>
			<LoginForm />
		</div>
	);
};

export default LoginPage;
