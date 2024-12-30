import { createStore } from 'stan-js';

export const { useStore: useCrudModalStore } = createStore<{
	open: boolean;
	data: unknown;
}>({
	open: false,
	data: null,
});
