const AuthLayout = ({ children }: Readonly<{ children?: React.ReactNode }>) => {
	return (
		<div className='flex min-h-dvh items-center justify-center bg-background p-4'>
			<div className='w-full max-w-md'>
				<div className='rounded-lg border bg-card p-8 shadow-sm'>
					{children}
				</div>
			</div>
		</div>
	);
};

export default AuthLayout;
