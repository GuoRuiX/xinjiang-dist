import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken, getRefreshToken, setToken } from '@/utils/auth'

// create an axios instance
let url = 'pinkun'

const service = axios.create({
  baseURL: '', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 1000 * 300  // request timeout
})
console.log(axios.create)
// request interceptor
service.interceptors.request.use(
  async config => {
    // console.log(config.url)
    // config.url=url+config.url
    // do something before request is sent

    // if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      // config.headers['X-Token'] = getToken()
    // }
    if (getToken()) {
      await axios.get('api/login/refreshToken', {params: {}, headers: {'Authorization': getToken(),'Authorization-Refresh': getRefreshToken()}}).then(res => {
        let statusCode = res.data.code;
        if ( statusCode === "00010" || statusCode === "00011" || statusCode === "00012" || statusCode === "00013" || statusCode === "00014" || statusCode === "00015" ) {
            // console.log(statusCode)
            store.dispatch("user/resetToken").then(() => {
                location.reload();
            });
        } else {
          setToken(res.data.data.token);
        }
      })
      config.headers["Authorization"] = getToken(); // 请求头中的token
      config.headers['Authorization-Refresh'] = getRefreshToken();  // 请求头中的刷新token
      // config.headers["toKen"] = getToken();
    }

    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data

    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== '00000') {
      Message({
        message: res.msg || '网络错误',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.msg || '网络错误'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.msg || '网络错误',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service