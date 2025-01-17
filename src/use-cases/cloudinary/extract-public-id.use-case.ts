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

export const extractPublicIdFromUrlWithNoFolder = (url: string) => {
	try {
		const splittedUrl = url.split('/');
		const publicId =
			splittedUrl?.[splittedUrl.length - 2] +
			'/' +
			splittedUrl?.[splittedUrl.length - 1].split('.')?.[0];

		if (!publicId) {
			return null;
		}

		return publicId;

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (error) {
		return null;
	}
};
