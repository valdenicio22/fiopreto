import React from 'react'
import { useRouter } from 'next/router'

import { InfoBusiness } from '../../components/UpdateForms/InfoBusiness'
import { Owner } from '../../components/UpdateForms/Owner'

import { UserLoggedContext } from '../../contexts/UserLoggedContext'

export default function FormEdit() {
  const { userData, updateUserData, userUpdateLoading } =
    React.useContext(UserLoggedContext)

  const router = useRouter()

  if (!userData) {
    return <p>Loading...</p>
  }

  const currentFormName = router.query.form as string

  const forms = {
    owner_update: (
      <Owner
        initialValues={userData}
        updateUser={updateUserData}
        userUpdateLoading={userUpdateLoading}
      />
    ),
    infoBusiness_update: (
      <InfoBusiness />
      // initialValues={userData}
      // updateUser={updateUserData}
      // userUpdateLoading={userUpdateLoading}
      // />
    ),
  }

  const form = currentFormName && forms[currentFormName]

  return <div>{form && form}</div>
}
