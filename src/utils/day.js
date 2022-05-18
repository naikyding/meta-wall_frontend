import dayjs from 'dayjs'

export const day = (time) => dayjs(time).format('YYYY/MM/DD HH:mm')
