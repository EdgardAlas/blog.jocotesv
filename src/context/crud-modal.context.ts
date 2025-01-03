/* eslint-disable @typescript-eslint/no-explicit-any */
import { createStore } from 'stan-js';

export const { useStore: useCrudModalStore } = createStore<{
	open: boolean;
	data: any;
}>({
	open: false,
	data: null,
});
