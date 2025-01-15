export type Post = {
	id: string;
	title: string;
	content: string;
	author: string;
	publicationDate: string;
	description: string;
	image: string;
	lang: string;
	related: {
		slug: string;
		id: string;
		parentId: string | null;
		lang: string;
	}[];
};
