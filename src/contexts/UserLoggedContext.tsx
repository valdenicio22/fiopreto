import Router from 'next/router'
import React from 'react'
import { api } from '../services/api'
import { AuthContext } from './AuthContext'

export type UserData = {
  name: string
  email: string
  dob: string
}
export type SalonData = {
  closing: string
  cnpj: string
  id: 1
  img: string
  key_img: string
  name: string
  opening: string
  phone: number
  site: string
}

type UserLoggedContextData = {
  userData: UserData
  userUpdateLoading: boolean
  salonData: SalonData
  updateUserData: (newUserData: UserData) => void
  setSalonData: (newSalonDetailsData: SalonData) => void
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
  const [salonData, setSalonData] = React.useState<SalonData | undefined>()
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

  React.useEffect(() => {
    if (!user) {
      return
    }
    api
      .get(`/salon/user/`)
      .then((data) => {
        setSalonData({
          closing: data.data.data[0].closing,
          cnpj: data.data.data[0].cnpj,
          id: data.data.data[0].id,
          img: data.data.data[0].img,
          key_img: data.data.data[0].key_img,
          name: data.data.data[0].name,
          opening: data.data.data[0].opening,
          phone: data.data.data[0].phone,
          site: data.data.data[0].site,
        })
      })
      .catch((err) => console.log(err))
  }, [user])

  console.log({ salonData })

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

  // function sendInfoBusinessData(sendSalonData: SalonData) {
  //   if (!salonData || !user) {
  //     return
  //   }
  //   setUserUpdateLoading(true)
  //   return api
  //     .put(`/salon/${salonData.id}`, newInfoBusinessData)
  //     .then(({ data }) => {
  //       console.log({data})
  //     })
  //     .finally(() => {
  //       setUserUpdateLoading(false)
  //       Router.push('/perfil')
  //     })
  // }

  function updateUserData(newUserData: UserData) {
    sendUserData(newUserData)
  }

  return (
    <UserLoggedContext.Provider
      value={{
        userUpdateLoading,
        userData,
        salonData,
        updateUserData,
        setSalonData,
      }}
    >
      {children}
    </UserLoggedContext.Provider>
  )
}

export default UserLoggedContextProvider
