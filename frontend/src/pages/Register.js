import React, { useEffect, useState } from 'react'
import { FaPiggyBank} from 'react-icons/fa';
import { fetchStatus, registerUser, resetStatus } from '../features/users/usersSlice';
import { useDispatch, useSelector } from 'react-redux';
import validateUser from '../helper/register/validateUser';
import Spinner from '../components/Spinner';
import { closeSpinner, openSpinner, showSpinner, spinnerDelay } from '../features/page/pageSlice';
import { useNavigate } from 'react-router-dom';
import InputComponent from '../components/InputComponent';


const Register = () => {
  // Todo implementation of controlled Input and register logic
  const enableSpinner = useSelector(showSpinner)
  const delay = useSelector(spinnerDelay)
  const status = useSelector(fetchStatus)
  const navigate = useNavigate()
  const [user, setUser] = useState(
    {
      firstname: '',
      lastname: '',
      email: '',
      username: '', 
      tel: '',
      password: '',
      confirmPassword: '',
      gender: '',
      dob: ''
    }
  )
  const [errors, setErrors] = useState({status: false})
  const dispatch = useDispatch();
 
  const signUp = async (e) => {
    e.preventDefault()
    const registrationErrors = validateUser(user)
    if(registrationErrors.hasErrors) {
      setErrors(registrationErrors.errors)
      return
    }
    dispatch(openSpinner())
    dispatch(registerUser(user)) // Dispatch action to register user in the Redux store
  }
  const handleInputChange = (e) => {
    setUser({...user, [e.target.name]: e.target.value })
  }
  const errorStyle = (fieldname) => errors[fieldname] ? 'text-red-500' : ''
  const disabledStyle = validateUser(user).hasErrors ? 'bg-blue-300 hover:bg-blue-300' : 'hover:bg-opacity-90 bg-blue-500'
  useEffect(() => {
    if (status === 'SUCCESS') {
      setTimeout(() => {
        dispatch(closeSpinner());
        dispatch(resetStatus())
        navigate('/successful');
      }, delay)
    } else if (status === 'FAILED') {
      setTimeout(() => {
        dispatch(closeSpinner());
        dispatch(resetStatus())
      }, delay);
    }
  }, [status, dispatch, navigate]);
  return (
    <main className="font-roboto flex flex-col w-full min-h-screen justify-center items-center bg-gradient-to-r from-gray-300 to-white-500 pb-8 relative">
      {enableSpinner && <Spinner />}
      <section className='flex flex-col justify-center p-2 w-full w-3/5 gap-8 items-center sm:w-3/5 xl:w-2/5 sm:p-6'>
          <h1 className='text-xl font-bold flex flex-col items-center'>
            <FaPiggyBank size={40}/>
            IO-BANK</h1>
          <form className="flex flex-col sm:min-w-500 flex-1 w-full gap-3 bg-white p-5 rounded-md">
              <h2 className='md font-bold'>Create your account</h2>
              <div className='flex flex-col sm:flex-row gap-1 flex-1 w-full sm:gap-6'>
                <InputComponent inputProp={{ name: user.firstname, type: "text", label: "Provide Firstname", field: "firstname", placeholder: "Julius", handleInputChange }}/>
                <InputComponent inputProp={{ name: user.lastname, type: "text", label: "Provide Lastname", field: "lastname", placeholder: "Anderson", handleInputChange }}/>
              </div>
              <InputComponent inputProp={{ name: user.username, type: "email", label: "Provide Email", field: "username", placeholder: "JuliAnderson@gmail.com", handleInputChange }}/>
              <InputComponent inputProp={{ name: user.tel, type: "number", label: "Provide Tel", field: "tel", placeholder: "+23513895083", handleInputChange }}/>
              <div className='flex flex-col gap-1 flex-1 w-full mt-2'>
                <label htmlFor='gender'>Gender <span className={errorStyle('gender')}>*</span></label>
                <select value={user.gender} name='gender' onChange={handleInputChange} id='gender' className='flex w-full border border-blue-500 p-3 rounded-md focus:border-yellow-400 leading-none' required>
                    <option value="">Select Your Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
              </div>
              <InputComponent inputProp={{ name: user.dob, type: "date", label: "Provide Date of birth", field: "dob", handleInputChange }}/>
            
              <div className='flex flex-col sm:flex-row gap-1 flex-1 w-full sm:gap-6'>
                <InputComponent inputProp={{ name: user.password, type: "password", label: "Password", field: "password", placeholder: "Enter Your Password", handleInputChange }}/>
                <InputComponent inputProp={{ name: user.confirmPassword, type: "password", label: "Confirm Password", field: "confirmPassword", placeholder: "Confirm Your Password", handleInputChange }}/>
              </div>
              <button disabled={validateUser(user).hasErrors} onClick={signUp} type="button" className={`${disabledStyle} p-2 rounded-xl text-white font-bold mt-2 transition-all`}>SIGN UP</button>
          </form>
          <p>Have an account? <a href='/login' className='underline text-blue-500'>Login</a></p>
      </section>
    </main>
  )
}

export default Register
