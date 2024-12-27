import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

const AdminHomePage = () => {
	return (
		<>
			<Card>
				<CardHeader>
					<CardTitle>Welcome to Admin Panel</CardTitle>
					<CardDescription>
						Here you can manage your application
					</CardDescription>
				</CardHeader>
				<CardContent>
					<p>You can manage your application from here.</p>
				</CardContent>
			</Card>
		</>
	);
};

export default AdminHomePage;
