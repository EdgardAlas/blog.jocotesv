export default {
	navbar: {
		home: 'Home',
		search: 'Search',
	},
	Home: {
		featuredPosts: 'Featured Posts',
		recentPosts: 'Recent Posts',
		banner: {
			title: 'Welcome to JocoteSV blog',
			subtitle: 'Discover insightful articles on web development and design',
		},
		viewAll: 'View all posts',
		noRecentPosts: 'No recent posts available',
	},
	post: {
		createdBy: 'Created by',
		publishedOn: 'Published on',
	},
	search: {
		placeholder: 'Search...',
		latestPosts: 'Latest posts',
		notPostFound: 'No posts found',
		resultsFor: 'Search results for {search}',
	},
	pagination: {
		rowsPerPage: 'Rows per page',
	},
} as const;
