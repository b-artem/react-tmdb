import axios from 'axios'

const baseURL = 'https://api.themoviedb.org/3/'

const client = axios.create({
  baseURL,
  timeout: 10000
})

client.interceptors.request.use((config) => {
  const newConfig = config

  const params = newConfig.params || {}
  newConfig.params = { ...params, api_key: process.env.API_KEY }

  return newConfig
})

client.interceptors.response.use(
  response => response,
  (error) => {
    if (error.response) {
      const { message } = error.response.data
      const { status } = error.response

      const newError = new Error(message)
      newError.status = status

      return Promise.reject(newError)
    }

    return Promise.reject(error)
  }
)

export default client
