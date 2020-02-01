import dayjs from 'dayjs';

export const formatDatetime = (timestamp: number) => {
  return dayjs(timestamp).format('DD MM YYYY');
};

export const isRecent = (timestamp: number) => {
  return dayjs(timestamp).diff(dayjs(), 'day') <= 14;
};
