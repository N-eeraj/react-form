import { useState, useContext } from 'react'

import Input from '@components/Input'
import Button from '@components/Button'
import Toast from '@components/Toast'

import { LoginCredentialsContext } from '@/context'
import { isEmpty } from '@/utils'
import formStyles from '@styles/form.module.css'

const Login = ({onChangeForm}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [toast, setToast] = useState({ show: false, text: null, success: null })
  
  const [loginCredentials] = useContext(LoginCredentialsContext)

  const handleClick = () => {
    // validations
    if (isEmpty(email))
      return setToast({show: true, text: 'Please enter your e-mail id', success: false})
    if (isEmpty(password))
      return setToast({show: true, text: 'Please enter your password', success: false})

    // validate credentials
    const credentials = loginCredentials.find(({ email: mailId }) => mailId === email)
    if (!credentials)
      return setToast({show: true, text: 'User not found! Please sign up', success: false})
    if (credentials.password !== password)
      return setToast({show: true, text: 'Incorrect Password', success: false})

    setToast({show: true, text: 'Login Successfull', success: true})
  }

  const handleResetToast = () => setToast({ show: false, text: null, success: null })

  return (
    <>
      <h3 className={formStyles.heading}>
        Login
      </h3>

      <div className={formStyles.inputContainer}>
        <Input type="email" placeholder="Enter Email" value={email} onInput={input => setEmail(input)} />
        <Input type="password" placeholder="Enter Password" value={password} onInput={input => setPassword(input)} />
      </div>

      <div className={formStyles.actionsContainer}>
        <Button text="Login" onClick={handleClick} />

        <div className={formStyles.switchText}>
          Don't have an account?
          <span className={formStyles.switchButton} onClick={onChangeForm}>
            Sign Up
          </span>
        </div>
      </div>

      <Toast show={toast.show} text={toast.text} success={toast.success} onReset={handleResetToast} />
    </>
  )
}

export default Login