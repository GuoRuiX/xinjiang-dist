import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api/login',
    method: 'post',
    data
  })
}

export function refreshToken() {
  return request({
    url: '/api/login/refreshToken',
    method: 'get',
    data:null
  })
}

export function getInfo(token) {
  return request({
    url: '/api/login/getUser/'+token,
    method: 'get',
    params: null
  })
}

export function logout() {
  return request({
    url: '/api/login/loginOut',
    method: 'get'
  })
}
