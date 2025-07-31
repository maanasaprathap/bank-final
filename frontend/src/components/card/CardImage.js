import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { card } from '../../features/card/cardSlice'
import { FaExchangeAlt, FaPlus } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'

const CardImage = ({ setShowFundCardForm, setShowWithdrawForm, userCard }) => {
    useEffect(() => {}, [userCard])
  return (
    <>
      <div className='flex flex-col sm:flex-row sm:flex-wrap justify-center'>
          <div className='text-sm sm:text-xl p-2 bg-gray-200 bg-gray-200 rounded-xl flex gap-2 relative'>
            <img src={userCard.img} className='sm:w-400' />
            <div className='absolute mt-3 sm:mt-12 top-12 right-7 p-2 text-sm text-golden flex'>
                <div className='w-5 h-5 rounded-xl sm:w-8 sm:h-8 sm:rounded-2xl bg-red-500'></div>
                <div className='w-5 h-5 rounded-xl sm:w-8 sm:h-8 sm:rounded-2xl bg-golden ml-[-8px] sm:ml-[-12px] opacity-70'></div>
            </div>
            <p className='absolute bottom-5 sm:bottom-8 right-7 sm:right-7 p-2 text-sm text-golden'>{userCard.cardHolder}</p>
            <p className='absolute bottom-5 sm:bottom-8 left-7 sm:left-12 p-2 text-sm text-golden'>${userCard.balance}<span className='text-[9px]'>.50</span></p>
          </div>
        </div>
        
        <div className='text-sm sm:text-xl p-2 flex gap-4 sm:gap-6 items-center'>
          <div className='flex flex-col items-center gap-2 flex-1'>
            <div className='rounded-3xl bg-gray-300 border hover:bg-white flex justify-center items-center'>  
                <button onClick={() => setShowFundCardForm(true)} className='p-3 rounded-3xl flex flex-col justify-center text-sm'><FaPlus /></button>
            </div>
            <p className='text-sm'>Fund</p>
          </div>
          <div className='flex flex-col items-center gap-2 flex-1'>
            <div className='rounded-3xl bg-gray-300 border hover:bg-white flex justify-center items-center'>  
                <button onClick={() => setShowWithdrawForm(true)} className='p-3 rounded-3xl flex flex-col justify-center text-sm'><FaExchangeAlt /></button>
            </div>
            <p className='text-sm'>Withdraw</p>
          </div>
          <div className='flex flex-col items-center gap-2 flex-1'>
            <div className='rounded-3xl bg-gray-300 border hover:bg-white flex justify-center items-center'>  
                <button className='p-3 rounded-3xl flex flex-col justify-center text-sm text-red-500'><MdDelete /></button>
            </div>
            <p className='text-sm'>Delete</p>
          </div>
        </div>
    </>
  )
}

export default CardImage
