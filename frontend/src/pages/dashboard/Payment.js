import React from 'react'
import { FaCreditCard, FaFileInvoiceDollar, FaMoneyBill } from 'react-icons/fa'
import SectionContainer from '../../components/SectionContainer'

const Payment = () => {
  return (
    <SectionContainer>
        <p className='font-bold text-gray-600'>Quick Payments</p>
        <div className='flex flex-col sm:flex-row gap-6'>
          <div className='bg-gray-100 flex-1 flex flex-col gap-4 p-6 border border-gray-200 rounded-lg hover:border-blue-500 hover:cursor-pointer text-gray-600 flex'>
              <FaMoneyBill color='blue' size={50}/>
              <p>Bills Payment</p>
              <div className='flex flex-1 w-full justify-between text-sm'>
                <p>Pay all your bills, subscriptions, utility bills and more</p>
              </div>
          </div>
          <div className='bg-gray-100 flex-1 flex flex-col gap-4 p-6 border border-gray-200 rounded-lg hover:border-blue-500 hover:cursor-pointer text-gray-600 flex'>
              <FaFileInvoiceDollar color='blue' size={50}/>
              <p>Invoice</p>
              <div className='flex flex-1 w-full justify-between text-sm'>
                <p>Pay all your bills, subscriptions, utility bills and more</p>
              </div>
          </div>
          <div className='bg-gray-100 flex-1 flex flex-col gap-4 p-6 border border-gray-200 rounded-lg hover:border-blue-500 hover:cursor-pointer text-gray-600 flex'>
              <FaCreditCard color='blue' size={50}/>
              <p>Cards</p>
              <div className='flex flex-1 w-full justify-between text-sm'>
                <p>Make Payments across all platforms using your card</p>
              </div>
          </div>
        </div>
      </SectionContainer>
  )
}

export default Payment
