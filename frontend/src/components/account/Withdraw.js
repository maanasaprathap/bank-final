import React, { useEffect, useMemo, useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { showSpinner, openSpinner, closeSpinner } from '../../features/page/pageSlice'
import { accounts, fetchAccountHolder, fetchAccountStatus, fetchRecipient, resetRecipient, resetAccountStatus, transferFunds, fetchAccounts } from '../../features/accounts/accountSlice'
import Spinner from '../Spinner'


const Withdraw = ({ setShowWithdrawForm }) => {
  const dispatch = useDispatch()
  const accountList = useSelector(accounts)
  const status = useSelector(fetchAccountStatus)
  const recipient = useSelector(fetchRecipient)
  const [transactionInfo, setTransactionInfo] = useState({
    recipientAccountNumber: '',
    amount: '',
    code: 'USD',
  })
  const enableInputs = useMemo(() => recipient ? false : true, [recipient])
  const enableSpinner = useSelector(showSpinner)
  const [fromAccount, setFromAccount] = useState(accountList.filter(acc => acc.code === 'USD')[0])
  const findRecipient = () => {
    dispatch(openSpinner())
    dispatch(fetchAccountHolder(transactionInfo))
  }
  const handleInputChange = (e) => {
    setTransactionInfo({...transactionInfo, [e.target.name]: e.target.value})
    if(e.target.name === "code") setFromAccount(accountList.filter(acc => acc.code === e.target.value)[0])
    if(e.target.name === "recipientAccountNumber") handleRecipientAccountChange(e)
  }
  const handleRecipientAccountChange = (e) => {
    if(e.target.value.toString().length === 10) {
      dispatch(openSpinner())
      dispatch(fetchAccountHolder({ ...transactionInfo, recipientAccountNumber: e.target.value}))
      return
    }
    dispatch(resetRecipient())
  }
  const closeWithdrawForm = () => {
    dispatch(resetRecipient())
    setShowWithdrawForm(false)
  }
  const transfer = () => {
    if(transactionInfo.amount > fromAccount.balance) {
      alert('Insufficient funds')
      return;
    }
    console.log(JSON.stringify(transactionInfo))
    dispatch(openSpinner())
    dispatch(transferFunds(transactionInfo))
    dispatch(fetchAccounts())
    setTimeout(() => closeWithdrawForm(), 3500)
    
  }
  useEffect(() => {
    if (status === 'SUCCESS') {
      console.log('Printing out the status of the transzation ' + status)
      setTimeout(() => {
        dispatch(closeSpinner())
        dispatch(resetAccountStatus())
      }, 2000)
    }
    if (status === 'FAILED') {
      setTimeout(() => {
        dispatch(closeSpinner())
        dispatch(resetAccountStatus())
      }, 2000)
    }
  }, [dispatch, status])
  return (
    <section className='flex flex-col p-2 gap-8 sm:w-3/5 xl:w-2/5 sm:p-6 h-3/5 bg-white border rounded-xl absolute right-5  left-5 sm:left-auto sm:h-[550px] mt-12'>
      <form className='p-2 w-full flex flex-col justify-between h-full relative'>
        {enableSpinner && <Spinner />}
        <button className='absolute top-1 right-2' type='button' onClick={closeWithdrawForm}><FaTimes /></button>
        <div className='flex flex-col gap-4'>
            <label>Withdraw Your Funds</label>
        </div>
        <div className='flex flex-col gap-4'>
          <div className='flex flex-col gap-2'>
            <label htmlFor='from' className='w-full flex justify-between'><span>Select Account </span><span className='text-sm mt-1'>Balance {fromAccount && fromAccount.symbol}{fromAccount && fromAccount.balance}</span></label>
            <select id='from' name='code' value={transactionInfo.code} className='bg-gray-200 h-full p-2 lg:p-3 rounded-md' onChange={handleInputChange}>
                {accountList.map(acc => (
                    <option key={acc.code} value={acc.code}>{acc.code}</option>
                ))}
            </select>
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor='bank' className=''>Select Bank</label>
            <select id='bank' className='bg-gray-200 h-full p-2 lg:p-3 rounded-md'>
              <option>IO BANK</option>
            </select>
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor='amount' className=''>Recipient Account Number</label>
            <div className='flex flex-1'>
              <input
                type='number'
                name='recipientAccountNumber'
                value={transactionInfo.recipientAccountNumber}
                onChange={handleInputChange}
                placeholder='100'
                className='flex-1 p-2 lg:p-3 border-gray-200 border-2 rounded-md'
              />
              <button type='button' onClick={findRecipient} className='p-2'>
                Find Recipient
              </button>
            </div>
            {recipient && <p className='text-sm text-blue-500 pl-2'>{recipient.accountName}</p>}
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor='amount' className=''>Amount</label>
            <input name="amount" id="amount" value={transactionInfo.amount} onChange={handleInputChange} disabled={enableInputs} type='number' placeholder='100' className='flex-1 p-2 lg:p-3 border-gray-200 border-2 rounded-md' />
            <p className='text-[12px] flex-1 w-full flex justify-end'>You'll be charged {`${fromAccount.symbol} ${transactionInfo.amount * 0.01}`}</p>
          </div>
        </div>
        <button disabled={transactionInfo.amount > fromAccount.balance || transactionInfo.amount <= 0} value={transactionInfo.amount} onClick={transfer} type="button" className='bg-blue-500 p-2 rounded-xl text-white font-bold mt-2  hover:bg-opacity-90 transition-all'>Withdraw</button>
      </form>
    </section>
  )
}

export default Withdraw
