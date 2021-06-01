import Router from 'next/router'
import React from 'react'
import { api } from '../services/api'
import { AuthContext } from './AuthContext'

type SalonDataPut = {
  salon: {
    name: string
    phone: string
    site: string
    cnpj: string
    img: string
    key_img: string
    opening: string
    closing: string
    id: number
  }
  address: {
    zip: number
    street: string
    street1: string
    number: number
    district: string
    city: string
    state: string
    ibge: number
  }
}

export type UserData = {
  name: string
  email: string
  dob: string
}

export type Address = {
  zip: string
  street: string
  number: string
  complement: string
  state: string
  city: string
  ibge: number
}
export type SalonData = {
  closing: string
  cnpj: string
  id: number
  img: string
  key_img: string
  name: string
  opening: string
  phone: string
  site: string
  address: Address
}

type UserLoggedContextData = {
  userData: UserData
  userUpdateLoading: boolean
  salonData: SalonData
  updateUserData: (newUserData: UserData) => void
  updateSalonData: (newSalonData: SalonData) => void
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
        // console.log(data.data.data[0].addresses.city)
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
          address: {
            zip: data.data.data[0].addresses.zip,
            street: data.data.data[0].addresses.street,
            complement: data.data.data[0].addresses.street1,
            number: data.data.data[0].addresses.number,
            city: data.data.data[0].addresses.city,
            state: data.data.data[0].addresses.state,
            ibge: data.data.data[0].addresses.ibge,
          },
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

  function updateUserData(newUserData: UserData) {
    sendUserData(newUserData)
  }

  function unmask(value: string) {
    return value.replace(/[.]/g, '').replace(/[-]/g, '').replace(/[/]/g, '')
  }

  function convertToSalonDataPut(salonData: SalonData): SalonDataPut {
    const { address } = salonData
    return {
      salon: {
        name: salonData.name,
        phone: salonData.phone,
        site: salonData.site,
        cnpj: unmask(salonData.cnpj),
        img: salonData.img,
        key_img: salonData.key_img,
        opening: salonData.opening,
        closing: salonData.closing,
        id: salonData.id,
      },
      address: {
        zip: Number(unmask(address.zip)),
        street: address.street,
        street1: address.complement,
        number: Number(address.number),
        district: '',
        city: address.city,
        state: address.state,
        ibge: Number(address.ibge),
      },
    }
  }

  function sendSalonData(salonDataPut: SalonDataPut) {
    if (!salonData || !user) {
      return
    }
    setUserUpdateLoading(true)
    return api
      .put(`/salon/${salonData.id}`, salonDataPut)
      .then(({ data }) => {
        console.log({ data })

        setSalonData({
          closing: data.closing,
          cnpj: data.cnpj,
          id: data.id,
          img: data.img,
          key_img: data.key_img,
          name: data.name,
          opening: data.opening,
          phone: data.phone,
          site: data.site,
          address: {
            zip: data.address.zip,
            street: data.address.street,
            complement: data.address.street1,
            number: data.address.number,
            city: data.address.city,
            state: data.address.state,
            ibge: data.address.ibge,
          },
        })
      })
      .finally(() => {
        setUserUpdateLoading(false)
        Router.push('/perfil')
      })
  }

  function updateSalonData(newSalonData: SalonData) {
    // console.log('Antes do fatorar', newSalonData)
    const salonDataPut = convertToSalonDataPut(newSalonData)
    // console.log('Depois do fatorar', salonDataPut)
    sendSalonData(salonDataPut)
  }

  console.log('Salao ATUAL ---- ', salonData)

  return (
    <UserLoggedContext.Provider
      value={{
        userUpdateLoading,
        userData,
        salonData,
        updateUserData,
        updateSalonData,
      }}
    >
      {children}
    </UserLoggedContext.Provider>
  )
}

export default UserLoggedContextProvider
