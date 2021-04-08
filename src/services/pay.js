import request from '@/utils/request'

// 创建商品订单
export function createCourseOrder (data) {
  return request({
    method: 'POST',
    url: '/front/order/saveOrder',
    data
  })
}

// 获取支付方式
export function getPayInfo (shopOrderNo) {
  return request({
    method: 'GET',
    url: '/front/pay/getPayInfo',
    params: {
      shopOrderNo
    }
  })
}

// 创建订单(发起支付)
export function createPayOrder (data) {
  return request({
    method: 'POST',
    url: '/front/pay/saveOrder',
    data
  })
}

// 查询订单(支付结果)
export function getPayResult (orderNo) {
  return request({
    method: 'GET',
    url: '/front/pay/getPayResult',
    params: {
      orderNo
    }
  })
}
