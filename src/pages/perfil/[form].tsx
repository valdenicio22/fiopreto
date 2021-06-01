import { useRouter } from 'next/router'
import * as React from 'react'
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
    details_business: <div>Novo form</div>,
  }

  const form = currentFormName && forms[currentFormName]

  return <div>{form && form}</div>
}
