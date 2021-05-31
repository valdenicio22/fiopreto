import React from 'react'

type Address = {
  zipCode: string
  street: string
  number: string
  complement: string
  state: string
  city: string
  ibge: string
}

export type SalonData = {
  businessName: string
  cnpj: string
  phoneNumber: string
  website: string
  img: string
  key_img: string
  address: Address
  opening: string
  closure: string
  user_id?: number
}

type SignUpContextData = {
  salonData: SalonData
  progress: number
  setSalonData: React.Dispatch<React.SetStateAction<SalonData>>
  setProgress: React.Dispatch<React.SetStateAction<number>>
  handleNext: () => void
  handleBack: () => void
}

export const SignUpContext = React.createContext<SignUpContextData>(
  {} as SignUpContextData
)

const SignUpProvider: React.FC = ({ children }) => {
  const [salonData, setSalonData] = React.useState<SalonData>({
    businessName: '',
    cnpj: '',
    phoneNumber: '',
    website: '',
    img: '',
    key_img: '',
    opening: '',
    closure: '',
    address: {
      zipCode: '',
      street: '',
      number: '',
      complement: '',
      city: '',
      state: '',
      ibge: '',
    },
  })
  const [progress, setProgress] = React.useState(0)

  const handleNext = React.useCallback(() => {
    setProgress(progress + 1)
  }, [progress])

  const handleBack = React.useCallback(() => {
    setProgress(progress - 1)
  }, [progress])

  return (
    <SignUpContext.Provider
      value={{
        salonData,
        progress,
        setSalonData,
        setProgress,
        handleNext,
        handleBack,
      }}
    >
      {children}
    </SignUpContext.Provider>
  )
}

export default SignUpProvider
