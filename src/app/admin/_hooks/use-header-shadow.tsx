import { useScrollY } from '@/hooks/use-scroll-y';
import { useEffect, useState } from 'react';

export const useHeaderShadow = () => {
	const [hasShadow, setHasShadow] = useState(false);

	const scrollY = useScrollY();

	useEffect(() => {
		const newHasShadow = scrollY > 0;

		if (hasShadow !== newHasShadow) {
			setHasShadow(newHasShadow);
		}
	}, [scrollY, hasShadow]);

	return hasShadow;
};
