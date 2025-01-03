interface WithPagination<T> {
	data: T[];
	totalPages: number;
}

interface NextPageWithPagination {
	searchParams: Promise<{
		search: string;
		page: string;
		size: string;
	}>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TODO = any;
