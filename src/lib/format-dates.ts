import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(relativeTime);
dayjs.extend(LocalizedFormat);

export const formatDate = (date: string | Date | number | undefined | null) => {
	return dayjs(date);
};
