/* eslint-disable no-unused-vars */
import axios from 'axios'

declare module 'axios' {
  export interface AxiosRequestConfig {
    toastShow?: 0 | 1
  }
}
