import Router from 'next/router'
import React, { useContext } from 'react'
import { api } from '../services/api'
import { AuthContext } from './AuthContext'

export type UserData = {
  name: string
  email: string
  dob: string
}
type UserLoggedContextData = {
  userData: UserData
  updateUserData: (newUserData: UserData) => void
  userUpdateLoading: boolean
}

export const UserLoggedContext = React.createContext<UserLoggedContextData>(
  {} as UserLoggedContextData
)
interface UserLoggedContextProviderProps {
  children: React.ReactNode
}
const UserLoggedContextProvider = ({
  children,
}: UserLoggedContextProviderProps) => {
  const [userData, setUserData] = React.useState<UserData | undefined>()
  const [userUpdateLoading, setUserUpdateLoading] = React.useState(false)

  const { user } = React.useContext(AuthContext)

  React.useEffect(() => {
    if (!user) {
      return
    }
    api
      .get(`/user/${user.id}`)
      .then(({ data }) => {
        setUserData({
          name: data.name,
          email: data.email,
          dob: data.dob,
        })
      })
      .catch((err) => console.log(err))
  }, [user])

  function sendUserData(newUserData: UserData) {
    if (!userData || !user) {
      return
    }
    setUserUpdateLoading(true)
    return api
      .put(`/user/${user.id}`, newUserData)
      .then(({ data }) => {
        setUserData({
          name: data.name,
          email: data.email,
          dob: data.dob,
        })
      })
      .finally(() => {
        setUserUpdateLoading(false)
        Router.push('/perfil')
      })
  }

  function updateUserData(newUserData: UserData) {
    sendUserData(newUserData)
  }

  return (
    <UserLoggedContext.Provider
      value={{
        userUpdateLoading,
        userData,
        updateUserData,
      }}
    >
      {children}
    </UserLoggedContext.Provider>
  )
}

export default UserLoggedContextProvider
