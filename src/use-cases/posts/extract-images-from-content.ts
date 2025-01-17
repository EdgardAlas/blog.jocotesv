import { JSDOM } from 'jsdom';

export const extractImagesIdFromContent = (
	content: string,
	...extraImages: string[]
) => {
	const dom = new JSDOM(content);
	const images = dom.window.document.querySelectorAll('img');

	return [
		...new Set(Array.from(images).map((img) => img.dataset.id ?? '')),
		...extraImages,
	].filter(Boolean);
};
