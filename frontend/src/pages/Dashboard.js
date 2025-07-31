import React, { useEffect } from 'react'
import Header from '../components/dashboard/Header'
import NavBar from '../components/dashboard/NavBar'
import Transaction from './dashboard/Transaction'
import Home from './dashboard/Home'
import Account from './dashboard/Account'
import Card from './dashboard/Card'
import { Route, Routes, useLocation } from 'react-router-dom'
import Payment from './dashboard/Payment'
import Settings from './dashboard/Settings'
import Profile from './dashboard/Profile'
import Convert from './dashboard/Convert'
import { fetchAccounts } from '../features/accounts/accountSlice'
import { useDispatch } from 'react-redux'
import { fetchTransactions } from '../features/transactions/transactionsSlice'
import { fetchCard } from '../features/card/cardSlice'

const Dashboard = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  
  useEffect(() => {
    dispatch(fetchAccounts())
    dispatch(fetchTransactions(0))
    dispatch(fetchCard())
  }, [dispatch])
  return (
    <main className="font-roboto lg:ml-250">
        <section className="font-roboto flex flex-row w-full min-h-screen bg-gradient-to-r from-gray-300 to-white-500 overflow-x-hidden relative">
          <NavBar />
          <Header />
            <section className='z-10 relative flex-1 pt-12 p-2 sm:p-6 w-full  sm:mt-6'>
              {/* <Spinner /> */}
              <Routes>
                <Route path='/' element={<Home />}/>
                <Route path='/accounts' element={<Account />}/>
                <Route path='/payments' element={<Payment />}/>
                <Route path='/transactions' element={<Transaction />}/>
                <Route path='/cards' element={<Card />}/>
                <Route path='/settings' element={<Settings />}/>
                <Route path='/profile' element={<Profile />}/>
                <Route path='/convert' element={<Convert />}/>
              </Routes>
            </section>
        </section>
      </main>
  )
}

export default Dashboard
