import React from 'react';

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
  date: string;
  businessName: string;
  cnpj: string;
  phoneNumber: string;
  website: string;
  img: string;
  key_img: string;
  address: Address;
  opening: string;
  closure: string;
}

interface SignUpContextData {
  signUpData: SignUpData;
  progress: number;
  selectedFile: File;
  loading: boolean;
  setSelectedFile: React.Dispatch<React.SetStateAction<File>>;
  setSignUpData: React.Dispatch<React.SetStateAction<SignUpData>>;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  handleNext: () => void;
  handleBack: () => void;
}

export const SignUpContext = React.createContext<SignUpContextData>(
  {} as SignUpContextData
);

const SignUpProvider: React.FC = ({ children }) => {
  const [signUpData, setSignUpData] = React.useState<SignUpData>({
    userName: '',
    email: '',
    password: '',
    date: '',
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
    },
  });
  const [progress, setProgress] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState<File>();

  const handleNext = React.useCallback(() => {
    setProgress(progress + 1);
  }, [progress]);

  const handleBack = React.useCallback(() => {
    setProgress(progress - 1);
  }, [progress]);

  console.log({ signUpData });

  return (
    <SignUpContext.Provider
      value={{
        signUpData,
        progress,
        selectedFile,
        loading,
        setSignUpData,
        setProgress,
        handleNext,
        handleBack,
        setSelectedFile,
        setLoading,
      }}
    >
      {children}
    </SignUpContext.Provider>
  );
};

export default SignUpProvider;
