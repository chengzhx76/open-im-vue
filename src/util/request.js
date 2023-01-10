import axios from 'axios'
import { contextPath } from './server'

import { getToken, removeToken } from '@/util/auth'

const service = axios.create({
  baseURL: contextPath,
  timeout: 6000
})

service.interceptors.request.use(config => {
  const contentType = config.contentType ? config.contentType : 'application/json; charset=UTF-8'
  config.headers['Content-Type'] = contentType
  config.headers['X-Token'] = getToken()
  return config
}, error => {
  Promise.reject(error)
})

service.interceptors.response.use(
  response => {
    const data = response.data
    if (data.meta.code !== 200) {
      if (data.meta.code === 301) {
        ElMessageBox.confirm(
          `你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出`,
          '登录过期',
          {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning',
            center: true,
          }
        ).then(() => {
          removeToken()
          location.reload()
        })
      } else {
        ElMessage.warning(data.meta.msg)
      }
    }
    return {
      data: data.data,
      meta: data.meta
    }
  },
  error => {
    console.error(error)
    return error
  }
)

export default service
