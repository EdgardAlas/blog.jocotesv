export type Post = {
	id: string;
	title: string;
	content: string;
	featured: boolean;
	image: string;
	description: string;
	slug: string;
	status: string;
	author: {
		value: string;
		label: string;
	};
	publishedAt: string;
	categories: {
		value: string;
		label: string;
	}[];
};
