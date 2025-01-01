export const extractPublicIdFromUrl = (url: string, folder: string) => {
	try {
		const splittedUrl = url.split(`/${folder}/`);
		const publicId = splittedUrl?.[1]?.split('.')?.[0];

		if (!publicId) {
			return null;
		}

		return `${folder}/${publicId}`;

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (error) {
		return null;
	}
};

