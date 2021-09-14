import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken, setRefreshToken, removeRefreshToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    roles:[]
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  },
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { loginName, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ userName: loginName.trim(), passWord: password }).then(response => {
        const { data } = response
        // commit('SET_TOKEN', data.token)
        localStorage.setItem('userType',data.user.userType)
        localStorage.setItem('name',data.user.loginName)
        localStorage.setItem('data',JSON.stringify(data))
        setToken(data.token)
        setRefreshToken(data.refreshToken)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {

      // getInfo(getToken()).then(response => {
        let response = {
            data:{
            }
          }
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        data.avatar = ''
        let userType = localStorage.getItem('userType')
        data.roles = [userType]
        data.loginName = localStorage.getItem('name')
        const { loginName, avatar, roles } = data
        commit('SET_NAME', loginName)
        commit('SET_AVATAR', avatar)
        commit('SET_ROLES', roles)
        resolve(data)
      // }).catch(error => {
      //   reject(error)
      // })
      // const { data } = response
      // let response = {
      //   data:{

      //   }
      // }
      // const { data } = response
      //   if (!data) {
      //     return reject('Verification failed, please Login again.')
      //   }
      //   data.name = JSON.parse(localStorage.getItem('data')).loginName
      //   data.avatar = ''
      //   data.roles = [localStorage.getItem('userType')] //['admin'] admin可以查看所有菜单
      //   const { name, avatar, roles } = data

      //   commit('SET_NAME', name)
      //   commit('SET_AVATAR', avatar)
      //   commit('SET_ROLES', roles)
      //   resolve(data)
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      removeToken() // must remove  token  first
      resetRouter()
      commit('RESET_STATE')
      resolve()
      // logout().then(() => {

      // }).catch(error => {
      //   reject(error)
      // })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      removeRefreshToken()
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

