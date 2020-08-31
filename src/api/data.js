import api from './index'

import request from '@/utils/request'

export function getBanner(data) {
    return request({
      url: api.banner,
      method: 'get',
      data
    })
  }

export function getCategory(data) {
    return request({
      url: api.category,
      method: 'get',
      data
    })
  }

export function getDetails(data) {
    return request({
      url: api.details,
      method: 'get',
      data
    })
  }

export function getRecommend(data) {
    return request({
      url: api.recommend,
      method: 'get',
      data
    })
  } 