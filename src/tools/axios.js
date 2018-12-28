import axios from 'axios'
import qs from 'qs'
import { message } from 'ant-design-vue'

const http = axios.create({
  timeout: 20000,
  withCredentials: true,
  headers: { 'X-Requested-With': 'XMLHttpRequest' },
  paramsSerializer (params) {
    params._ = Date.now()
    return qs.stringify(params, { arrayFormat: 'brackets' })
  }
})

/**
 * @author xuzilong
 * @desc 响应拦截器
 * @desc 内部接口：返回data.data数据
 * @desc 外部接口：拿取内层有意义的数据
 */
http.interceptors.response.use(
  function (response) {
    // 请求错误的处理
    if (
      typeof response.data.code !== 'undefined' &&
      response.data.code !== '0'
    ) {
      // 内部接口走这里（两种接口的error信息不同）
      const msg = response.data.msg || '未知错误！'
      console.error(msg)
      message.error(msg)
      return Promise.reject(msg)
    }

    return Promise.resolve(response.data.data)
  },
  function (error) {
    return Promise.reject(error)
  }
)

/**
 * @author xuzilong
 * @desc 请求拦截器
 * @desc 对graphql外部接口作了格式化处理，让其既兼容字符串格式，又支持JSON格式传入
 * @desc JSON格式如下：
 * @example
 * {
 *   type: 'query',  // （可不填，默认query），可选mutation，query
 *   name: 'users',  // 请求路由名称
 *   data: {         // 请求参数
 *     id: '12345678'
 *   },
 *   res: '{id}',    // 查询数据（String类型），可不填，不填会到./response.js里去自动匹配
 * }
 */
http.interceptors.request.use(
  function (config) {
    config.url = process.env.VUE_APP_PROXY_PREFIX + config.url

    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

export default http
