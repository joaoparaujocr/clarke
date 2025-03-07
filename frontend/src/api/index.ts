import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
  timeout: 60000
})

export default api