import axios from 'axios'
import { message } from 'antd'

const instance = axios.create()

instance.defaults.withCredentials = true

instance.defaults.baseURL = '//music.zhangayong.com'

const sucessCode = [200, 801, 802, 803]

instance.interceptors.response.use((res) => {
  if (sucessCode.indexOf(res.data.code) === -1) {
    if (res.config.toastShow !== 0) {
      message.warning(res.data.message)
    }
  }
  return Promise.resolve(res.data)
}, (error) => {
  if (error.config.toastShow !== 0) {
    const { response } = error
    if (response) {
      message.warning('网络请求失败，请稍后重试')
    } else if (error.code === 'ECONNABORTED') {
      message.warning('网络请求超时，请检查网络')
    } else {
      message.warning('网络连接失败，请检查网络')
    }
  }
  return Promise.resolve(error)
})

export default instance
