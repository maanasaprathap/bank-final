import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { accounts } from '../../features/accounts/accountSlice'
import { useNavigate } from 'react-router-dom'
import { createCard, fetchCardStatus, resetCardStatus } from '../../features/card/cardSlice'
import { closeSpinner, openSpinner, showSpinner } from '../../features/page/pageSlice'
import Spinner from '../Spinner'

const CreateCard = () => {
    const enablespinner = useSelector(showSpinner)
    const status = useSelector(fetchCardStatus)
    const dispatch = useDispatch()
    const accountList = useSelector(accounts)
    const [usdAccount, setUsdAccount] = useState(null)
    const navigate = useNavigate()
    const createUsdAccount = () => {
        navigate('/dashboard/accounts')
    }
    useEffect(() => {
        setUsdAccount(accountList.filter(account => account.code === 'USD')[0])
    }, [status])
    const CreateCardForm = ( {status} ) => {
        const [amount, setAmount] = useState('')
        const handleInputChange = (e) => {
            setAmount(e.target.value)
        }
        const createCreditCard = () => {
            dispatch(openSpinner())
            dispatch(createCard(amount))
        }
        useEffect(() => {
            setUsdAccount(accountList.filter(account => account.code === 'USD')[0])
            if (status === 'SUCCESS' || status === 'FAILED') {
                console.log('Printing out the status of the transaction ' + status)
                setTimeout(() => {
                dispatch(closeSpinner())
                dispatch(resetCardStatus())
                }, 3000)
            }
        }, [status])
        return <>
            <p className='text-sm sm:text-[16px] text-center'>You'll Be charged a service fee of 1USD for this transaction and a minimum deposit of 1USD for card funding</p>
            <form className='p-2 pt-5 w-full rounded-xl sm:w-3/5 bg-white items-center flex flex-col justify-center h-full relative gap-4'>
                {enablespinner && <Spinner />}
                <div className='flex flex-col gap-4 justify-center items-center'>
                    <label htmlFor='amount'>Funding Amount</label>
                    <input id='amount' name='amount' type='number' placeholder='Amount To fund Card' className='flex w-full border border-blue-500 p-3 rounded-md focus:border-yellow-400 leading-none' 
                        value={amount}
                        onChange={handleInputChange}
                    />
                </div>
                <button type='button' className='bg-blue-500 p-2 text-white hover:bg-blue-700 transition ease-in-out duration-1000 rounded-md' onClick={createCreditCard}>Create Card</button>
            </form>
        </>
    }
  return ( <>
      { (usdAccount) ? <CreateCardForm status={status}/> : <div className='flex flex-col gap-4'>
            <p className='text-sm text-center'>You Need To have a USD account, before creating a card.</p>
            <div className='p-2 w-full flex flex-col justify-between h-full relative'>
                <button type='button' className='bg-blue-500 p-2 text-white hover:bg-blue-700' onClick={createUsdAccount}>Create One</button>
            </div>
        </div>}
        </>
  )
}

export default CreateCard
