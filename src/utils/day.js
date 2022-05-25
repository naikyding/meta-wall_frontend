import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
import updateLocale from 'dayjs/plugin/updateLocale'
dayjs.extend(updateLocale)

dayjs.updateLocale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s: '幾秒鐘',
    m: '1 分鐘',
    mm: '%d 分鐘',
    h: '1 小時',
    hh: '%d 小時',
    d: '1 天',
    dd: '%d 天',
    M: '一個月',
    MM: '%d 個月',
    y: '一年',
    yy: '%d 年',
  },
})

export const day = (time) => dayjs(time).format('YYYY/MM/DD HH:mm')

export const dayToNow = (time) => dayjs(time).toNow(true)
