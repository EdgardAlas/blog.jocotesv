export default {
	navbar: {
		home: 'Inicio',
		search: 'Buscar',
	},
	home: {
		featuredPosts: 'Publicaciones Destacadas',
		recentPosts: 'Publicaciones Recientes',
		banner: {
			title: 'Bienvenido al blog JocoteSV',
			subtitle: 'Descubre artículos interesantes sobre desarrollo web y diseño',
		},
		viewAll: 'Ver todos los artículos',
		noRecentPosts: 'No hay publicaciones recientes disponibles',
	},
	post: {
		createdBy: 'Creado por',
		publishedOn: 'Publicado el',
	},
	search: {
		placeholder: 'Buscar...',
		latestPosts: 'Últimas publicaciones',
		notPostFound: 'No se encontraron publicaciones',
		resultsFor: 'Resultados de búsqueda para {search}',
	},
	pagination: {
		rowsPerPage: 'Filas por página',
	},
	notFound: {
		title: 'Página no encontrada',
		description: '¡Ups! La página que buscas no existe o ha sido movida.',
		goBack: 'Regresar',
		home: 'Inicio',
	},
} as const;
