import React, { useEffect } from 'react'
import { FaSmile, FaBars, FaExchangeAlt } from 'react-icons/fa'
import { MdNotifications, MdSettings } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchedUser } from '../../features/users/usersSlice'
import { openNavbar, toggleNavbar } from '../../features/page/pageSlice'
import { FaX } from 'react-icons/fa6'

const Header = () => {
  const dispatch = useDispatch()
  const user = useSelector(fetchedUser)
  const openNav = useSelector(openNavbar)
  const navigate = useNavigate()
  const toggleNav = () => {
    console.log(`${openNav}`)
    console.log('closing navbar')
    dispatch(toggleNavbar())
  }
  const navigatePage = (path) => {
    navigate(path)
  }
  useEffect(() => {}, [dispatch, openNav])
  return (
    <header className='fixed top-0 left-0 right-0 bg-white z-20 flex justify-between items-center p-3 lg:ml-250 pr-9 border-b-2'>
        <h1 className='flex items-center text-gray-600 text-lg font-bold gap-1 p-1'>Welcome {user.username} <FaSmile  size={20} color='#ffbf56'/> </h1>
        <div className='flex items-center'>
            {!openNav && <button className='lg:hidden' onClick={toggleNav}><FaBars size={25}/></button>}
            <div className='hidden lg:flex gap-5'>
              <button onClick={() => navigatePage('/dashboard/convert')} className='text-blue-500 hover:text-blue-700 flex items-center text-xl transition duration-500 ease-in-out gap-1'>
                <span>
                  <FaExchangeAlt />
                </span>
                <span className='text-sm'>Convert</span>
              </button>
              <button onClick={() => navigatePage('/dashboard/settings')} className='text-blue-500 hover:text-blue-700 flex items-center text-xl transition duration-500 ease-in-out p-2 border rounded-full'>
                <MdSettings size={30}/>
              </button>
              <button className='text-blue-500 hover:text-blue-700 flex items-center text-xl transition duration-500 ease-in-out p-3 border rounded-full bg-gray-100'>
                {user.firstname.substring(0, 1) + user.lastname.substring(0, 1)}
              </button>
              <button>
                <MdNotifications size={30} />
              </button>
            </div>
        </div>
    </header>
  )
}

export default Header
