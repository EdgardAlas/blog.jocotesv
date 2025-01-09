/* eslint-disable @typescript-eslint/no-explicit-any */
import { createStore } from 'stan-js';

export type CrudModalOptions = 'author' | 'category' | 'user' | 'upload' | null;

export const { useStore: useCrudModalStore } = createStore<{
	open: CrudModalOptions;
	data: any;
}>({
	open: null,
	data: null,
});
