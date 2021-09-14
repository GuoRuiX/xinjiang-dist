import Cookies from 'js-cookie'

const TokenKey = 'token'
const refreshToken = 'refreshToken'

export function getToken() {
  return Cookies.get(TokenKey)
}
export function getRefreshToken() {
  return Cookies.get(refreshToken)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}
export function setRefreshToken(token) {
  return Cookies.set(refreshToken, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
export function removeRefreshToken() {
  return Cookies.remove(refreshToken)
}
