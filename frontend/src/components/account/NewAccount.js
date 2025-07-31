import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { accounts, fetchAccountStatus, resetAccountStatus, createAccount, fetchAccounts } from '../../features/accounts/accountSlice'
import { FaTimes } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import Spinner from '../Spinner'
import { openSpinner, closeSpinner, showSpinner } from '../../features/page/pageSlice'

const NewAccount = ({ setShowForm }) => {
    const dispatch = useDispatch()
    const status = useSelector(fetchAccountStatus)
    const enableSpinner = useSelector(showSpinner)
    const accountsList = useSelector(accounts)
    const [currency, setCurrency] = useState('USD')
    const [accountType, setAccountType] = useState([
        {code: 'USD', symbol: '$', label: 'United States Dollar'},
        {code: 'NGN', symbol: '₦', label: 'Nigerian Naira'},
        {code: 'EUR', symbol: '€', label: 'European Euro'},
        {code: 'GBP', symbol: '£', label: 'British Pounds'},
        {code: 'INR', symbol: '₹', label: 'Indian Rupee'},
        {code: 'CNY', symbol: '¥', label: 'Chinese Yuan'}
    ])
    const handleSelectChange = (e) => {
        setCurrency(e.target.value)
    }
    const accountTypeList = accountsList.map((account) => account.code)
    const create = () => {
        const accountDetails = accountType.filter(account => account.code === currency)[0]
        dispatch(openSpinner())
        dispatch(createAccount(accountDetails))
        dispatch(fetchAccounts())
    }
    useEffect(() => {
        if (status === 'SUCCESS') { 
            setTimeout(() => {
                dispatch(closeSpinner());
                setShowForm(false);
                dispatch(resetAccountStatus());
            }, 3000);
        }
        if (status === 'FAILED') {
            dispatch(closeSpinner());
            dispatch(resetAccountStatus());
            alert('Account Creation Failed');
        }
        const updateList = () => {
            const filteredList = accountType.filter(account => !accountTypeList.includes(account.code) ? account.code : null)
            setAccountType(filteredList)
            filteredList.length > 0 && setCurrency(filteredList[0].code)
        }
        updateList()
    }, [dispatch, status]); // Keep only necessary dependencies
    
  return (
      <section className='flex flex-col p-2 gap-8 sm:w-3/5 xl:w-2/5 sm:p-6 bg-white border rounded-xl absolute right-5  left-5 sm:left-auto h-2/5 mt-12'>
        <form className='p-2 w-full flex flex-col justify-between h-full relative'>
            {enableSpinner && <Spinner />}
            <button className='absolute top-1 right-2' type='button' onClick={() => setShowForm(false)}><FaTimes /></button>
            <div className='flex flex-col gap-4'>
                <label>Choose Currency Type</label>
                <select className='flex w-full border border-blue-500 p-3 rounded-md focus:border-yellow-400 leading-none gap-4' value={currency} onChange={handleSelectChange}>
                    {accountType.map(type => (
                        <option key={type.code} value={type.code}>{type.label}</option>
                    ))}
                </select>
            </div>
            <button type="button" onClick={create} className='bg-blue-500 p-2 rounded-xl text-white font-bold mt-2  hover:bg-opacity-90 transition-all'>Create Bank Account</button>
        </form>
      </section>
  )
}

export default NewAccount
