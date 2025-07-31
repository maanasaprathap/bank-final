import React, { useEffect, useState } from 'react'
import { FaChevronRight, FaPiggyBank} from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { authenticateUser, fetchStatus, resetStatus } from '../features/users/usersSlice';
import Spinner from '../components/Spinner';
import { closeSpinner, openSpinner, showSpinner } from '../features/page/pageSlice';
import { useNavigate } from 'react-router-dom';
import InputComponent from '../components/InputComponent';

const Login = () => {
  const status = useSelector(fetchStatus)
  const enableSpinner = useSelector(showSpinner)
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    username: '',
    password: '',
  })
  const handleInputChange = (e) => {
    setUser({...user, [e.target.name]: e.target.value })
  }
  const enableButton = user.username.length > 0 && user.password.length > 0 
  // Todo implementation of controlled Input and login logic
 const login = () => {
    dispatch(openSpinner())
    dispatch(authenticateUser(user))
  }
  const disabledStyle = !enableButton ? 'bg-blue-300 hover:bg-blue-300' : 'hover:bg-opacity-90 bg-blue-500'

  useEffect(() => {
    if (status === 'SUCCESS') {
      setTimeout(() => {
        dispatch(closeSpinner())
        navigate('/dashboard')
        dispatch(resetStatus())
      }, 3000)
    } else if (status === 'FAILED') {
      setTimeout(() => {
        dispatch(resetStatus())
        dispatch(closeSpinner())
      }, 3000)
    }
  }, [dispatch, status, navigate])
  return (
    <main className="font-roboto flex flex-col w-screen sm:w-full lg:w-screen md:w-screen h-screen justify-center items-center bg-gradient-to-r from-gray-300 to-white-500 relative">
    {enableSpinner && <Spinner />}
      <section className='flex flex-col justify-center p-2 w-full w-3/5 gap-8 items-center sm:w-3/5 xl:w-2/5 sm:p-6'>
          <h1 className='text-xl font-bold flex flex-col items-center'>
            <FaPiggyBank size={40}/>
            IO-BANK</h1>
          <form className="flex flex-col sm:min-w-500 flex-1 w-full gap-4 bg-white p-5 rounded-md">
              <h2>Login to your account</h2>
              <InputComponent inputProp={{ name: user.username, type: "email", label: "Email", field: "username", placeholder: "Enter Your Email", handleInputChange }}/>
              <InputComponent inputProp={{ name: user.password, type: "password", label: "Password", field: "password", placeholder: "Enter Your Password", handleInputChange }}/>
              <a className='underline text-blue-500 flex items-center' href='/'>Forgot Password <FaChevronRight /></a>
              <button disabled={!enableButton} onClick={login} type="button" className={`${disabledStyle} p-2 rounded-xl text-white font-bold mt-2 transition-all`}>LOGIN</button>
          </form>
          <p>Don't have an account? <a href='/signup' className='underline text-blue-500'>Create One</a></p>
      </section>
    </main>
  )
}

export default Login