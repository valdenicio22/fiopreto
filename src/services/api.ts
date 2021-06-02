import axios, { AxiosError } from 'axios'
import { parseCookies, setCookie } from 'nookies'
import { signOut } from '../contexts/AuthContext'

let cookies = parseCookies()

export const api = axios.create({
  baseURL: 'https://fiopreto.herokuapp.com/api/v1/',
  headers: {
    Authorization: `Bearer ${cookies['fiopreto.token']}`,
  },
})

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error: AxiosError) => {
    if (error.response.status === 401) {
      // signOut()
    }

    return Promise.reject(error)
  }
)
