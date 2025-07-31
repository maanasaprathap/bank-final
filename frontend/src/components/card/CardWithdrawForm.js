import React, { useEffect, useMemo, useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { accounts, fetchAccounts } from '../../features/accounts/accountSlice'
import { useDispatch, useSelector } from 'react-redux'
import { card, debitCard, fetchCardStatus, resetCardStatus, fetchCard } from '../../features/card/cardSlice'
import { closeSpinner, openSpinner, showSpinner } from '../../features/page/pageSlice'
import Spinner from '../Spinner'

const CardWithdrawForm = ({ setShowWithdrawForm }) => {
    const dispatch = useDispatch()
    const enableSpinner = useSelector(showSpinner)
    const status = useSelector(fetchCardStatus)
    const userCard = useSelector(card)
    const [amount, setAmount] = useState('')
    const disableButton = useMemo(() => {
      if(userCard.balance < amount || amount <= 0) {
        return true
      }
      else {
        return false
      }
    }, [amount, userCard])
    const debit = () => {
      if (amount > userCard.balance) {
        alert('Insufficient funds')
        return
      }
      dispatch(openSpinner())
      dispatch(debitCard(amount))
      dispatch(fetchAccounts())
      dispatch(fetchCard())
      setShowWithdrawForm(false)
    }
    useEffect(() => {
      if (status === 'SUCCESS') {
        console.log('Printing out the status of the transzation ' + status)
        setTimeout(() => {
          dispatch(closeSpinner())
          dispatch(resetCardStatus())
        }, 3000)
      }
      if (status === 'FAILED') {
        setTimeout(() => {
          dispatch(closeSpinner())
          dispatch(resetCardStatus())
          alert("Card debit failed")
        }, 3000)
      }
    }, [status, dispatch])
  return (
    <section className='flex flex-col p-2 gap-8 sm:w-3/5 xl:w-2/5 sm:p-6 sm:h-2/5 bg-white border rounded-xl absolute right-5  left-5 sm:left-auto  mt-12 z-10'>
      {enableSpinner && <Spinner />}
      <form className='p-2 w-full flex flex-col justify-between h-full relative gap-2'>
        <button className='absolute top-1 right-2' type='button' onClick={() => setShowWithdrawForm(false)}><FaTimes /></button>
        <div className='flex flex-col gap-4'>
            <h1 className='text-lg font-bold'>Withdraw From Card</h1>
        </div>
        <div className='flex flex-col gap-2'>
          <div className='flex flex-col gap-1'>
              <label htmlFor='from' className='w-full flex justify-between'><span>Select Account </span><span className='text-sm mt-1'>Card Balance ${userCard.balance}</span></label>
              <select id='currency' className='bg-gray-200 h-full p-2 lg:p-3 rounded-md'>
               <option value="USD">USD</option>
              </select>
          </div>
              <label>Amount</label>
              <input value={amount} onChange={e => setAmount(e.target.value)} type="number" className='border border-blue-500 p-3 rounded-md focus:border-yellow-400' placeholder='Enter amount' />
        </div>
        <button disabled={disableButton} onClick={debit} type="button" className='bg-blue-500 p-2 rounded-xl text-white font-bold mt-2  hover:bg-opacity-90 transition-all'>Transfer To Account</button>
      </form>
    </section>
  )
}

export default CardWithdrawForm
