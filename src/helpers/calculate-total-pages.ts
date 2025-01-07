export const calculateTotalPages = (count: number, pageSize: number) => {
	return Math.ceil(count / pageSize);
};
