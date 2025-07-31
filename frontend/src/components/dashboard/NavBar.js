import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { FaApplePay, FaCreditCard, FaFileInvoiceDollar, FaHome, FaLandmark, FaPiggyBank, FaUser, FaWallet } from 'react-icons/fa'
import { MdSettings } from 'react-icons/md'
import { openNavbar, toggleNavbar } from '../../features/page/pageSlice'
import { useDispatch, useSelector } from 'react-redux'
import { FaX } from 'react-icons/fa6'

 
const NavBar = () => {
  const location = useLocation()
  const openNav = useSelector(openNavbar)
  const [currentPage, setCurrentPage] = useState(location.pathname.split('/')[2] || 'home')
  const currentPageStyle = 'bg-blue-400 text-white'
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const toggleNav = () => {
    dispatch(toggleNavbar())
  }
  const handleClick = (path) => {
    if(path.endsWith('/dashboard')) {
      setCurrentPage('home')
    } else {
      setCurrentPage(path.split('/')[2])
    }
    navigate(path)
  }
  useEffect(() => {
    setCurrentPage(location.pathname.split('/')[2] || 'home')
  }, [currentPage, location])
  const pages = [
    { path: '/dashboard', icon: <FaLandmark />, label: 'Home' },
    { path: '/dashboard/accounts', icon: <FaWallet />, label: 'Accounts' },
    { path: '/dashboard/payments', icon: <FaApplePay />, label: 'Payments' },
    { path: '/dashboard/transactions', icon: <FaFileInvoiceDollar />, label: 'Transactions' },
    { path: '/dashboard/cards', icon: <FaCreditCard />, label: 'Card' },
    { path: '/dashboard/settings', icon: <MdSettings />, label: 'Settings' },
    { path: '/dashboard/profile', icon: <FaUser />, label: 'Profile' }
  ]
  return (
    <nav className={`${!openNav ? 'hidden lg:flex' : 'block'}` + `hidden fixed top-0 left-0 bottom-0 z-50 bg-white lg:flex flex-col w-250 border-l-2 gap-2 items-start border-r border-gray-300 shadow-xl`}>

      {<button className='lg:hidden absolute top-7 right-5' onClick={toggleNav}><FaX size={23}/> </button>}
      <h1 className='text-xl font-bold w-full flex gap-2 items-center p-5 border-b border-gray-300 shadow-sm'>
            <FaPiggyBank size={40}/>
            IO-BANK
      </h1>
      <ul className='w-full text-gray-600'>
        {pages.map((page, id) => <li key={id} className='p-1'>
          <button onClick={() => handleClick(page.path)} className={`rounded-md flex gap-2 items-center p-4 pt-2 pb-2 hover:bg-blue-400 hover:text-white w-full ${currentPage.startsWith(page.label.toLocaleLowerCase()) || currentPage.endsWith("/") ?  currentPageStyle : ''}`}>{page.icon}{page.label}</button>
        </li>)}
      </ul>
    </nav>
  )
}

export default NavBar
