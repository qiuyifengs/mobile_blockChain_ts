import axios from 'axios'

const service = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 5000
})

// request interceptor
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
