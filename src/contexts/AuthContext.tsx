import React from 'react'
import Router from 'next/router'
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import { api } from '../services/api'

interface User {
  email: string
  name: string
  id: number
}

interface SignInCredentials {
  email: string
  password: string
}

interface AuthContextData {
  signIn(credentials: SignInCredentials): Promise<void>
  user: User
  isAuthenticated: boolean
  error: boolean
}

interface AuthProviderProps {
  children: React.ReactNode
}

export function signOut() {
  destroyCookie(undefined, 'fiopreto.token')
  destroyCookie(undefined, 'fiopreto.refreshToken')
  Router.push('/')
}

export const AuthContext = React.createContext({} as AuthContextData)

const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split('.')[1]))
  } catch (e) {
    return null
  }
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = React.useState<User>()
  const isAuthenticated = !!user
  const [error, setError] = React.useState(false)

  React.useEffect(() => {
    const { 'fiopreto.token': token } = parseCookies()
    console.log(parseJwt(token))

    if (token) {
      const parsedToken = parseJwt(token)
      setUser(parsedToken.sub)
    }
  }, [])

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post('/auth/signin', {
        email,
        password,
      })

      const { token, refreshToken } = response.data

      setCookie(undefined, 'fiopreto.token', token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      })
      setCookie(undefined, 'fiopreto.refreshToken', refreshToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      })

      const parsedToken = parseJwt(token)
      setUser(parsedToken.sub)

      api.defaults.headers['Authorization'] = `Bearer ${token}`
      console.log('aaaaaaaaaaaaaaaaaaaaaaaaa')
      Router.push('/perfil')
      setError(false)
    } catch (err) {
      console.log({ err })
      setError(true)
    }
  }
  console.log({ user })
  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated, user, error }}>
      {children}
    </AuthContext.Provider>
  )
}
