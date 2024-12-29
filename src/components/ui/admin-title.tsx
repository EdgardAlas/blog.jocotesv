export const AdminTitle = ({
	title,
	description,
	children,
}: {
	title: string;
	description?: string;
	children?: React.ReactNode;
}) => {
	return (
		<div className='mb-4 flex justify-between gap-4 border-b border-primary/10 pb-4'>
			<div className='flex flex-col gap-1'>
				{title && <h1 className='text-2xl font-semibold'>{title}</h1>}
				{description && (
					<p className='text-sm font-medium leading-none'>{description}</p>
				)}
			</div>
			{children}
		</div>
	);
};
