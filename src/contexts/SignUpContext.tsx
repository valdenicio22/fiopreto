import React, { useState, createContext } from 'react';
import { useCallback } from 'react';

interface Address {
  zipCode: string;
  street: string;
  number: string;
  complement: string;
  city: string;
}

interface SignUpData {
  userName: string;
  email: string;
  password: string;
  businessName: string;
  cnpj: string;
  phoneNumber: string;
  website: string;
  img: string;
  key_img: string;
  address: Address;
}

interface SignUpContextData {
  signUpData: SignUpData;
  progress: number;
  selectedFile: File;
  setSelectedFile: React.Dispatch<React.SetStateAction<File>>;
  setSignUpData: React.Dispatch<React.SetStateAction<SignUpData>>;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  handleNext: () => void;
  handleBack: () => void;
}

export const SignUpContext = createContext<SignUpContextData>(
  {} as SignUpContextData
);

const SignUpProvider: React.FC = ({ children }) => {
  const [signUpData, setSignUpData] = useState<SignUpData>({
    userName: '',
    email: '',
    password: '',
    businessName: '',
    cnpj: '',
    phoneNumber: '',
    website: '',
    img: '',
    key_img: '',
    address: {
      zipCode: '',
      street: '',
      number: '',
      complement: '',
      city: '',
    },
  });
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = React.useState<File>();

  const handleNext = useCallback(() => {
    setProgress(progress + 1);
  }, [progress]);

  const handleBack = useCallback(() => {
    setProgress(progress - 1);
  }, [progress]);

  console.log({ signUpData });

  return (
    <SignUpContext.Provider
      value={{
        signUpData,
        progress,
        selectedFile,
        setSignUpData,
        setProgress,
        handleNext,
        handleBack,
        setSelectedFile,
      }}
    >
      {children}
    </SignUpContext.Provider>
  );
};

export default SignUpProvider;
