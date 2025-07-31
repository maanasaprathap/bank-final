import React from 'react'
import TextComponent from '../TextComponent'

const AccountDetails = ({ currentAccount }) => {
  return (
    <>
      <p className='font-bold text-gray-600 text-sm'>Your {currentAccount.currencyType} Account Informations</p>
        <div className='flex flex-col sm:flex-row  sm:flex-wrap'>
          <TextComponent textProp={{ tag: `Account Holder's Name`, value: currentAccount.accountName}} />
          <TextComponent textProp={{ tag: 'Account Number', value: currentAccount.accountNumber}} />
          <TextComponent textProp={{ tag: 'Bank Name', value: 'IO BANK'}} />
          <TextComponent textProp={{ tag: 'Account Type', value: 'Savings'}} />
          <TextComponent textProp={{ tag: 'Bank Address', value: '8, Dexter Avenue P.O Box 10035'}} />
          <TextComponent textProp={{ tag: 'Currency Type', value: currentAccount.code}} />
          <TextComponent textProp={{ tag: 'Account Tag', value: currentAccount.accountTag}} />
        </div>
    </>
  )
}

export default AccountDetails
