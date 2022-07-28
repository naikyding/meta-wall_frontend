import request from './request'

export const linePay = (data) => request.post('/payment/line', data)
