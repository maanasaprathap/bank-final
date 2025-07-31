import React from 'react'
import { card } from '../../features/card/cardSlice'
import { useSelector } from 'react-redux'
import TextComponent from '../TextComponent'

const CardDetails = () => {
    const userCard = useSelector(card)
  return (
    <>
      <p className='font-bold text-gray-600 text-sm'>Card Details</p>
        <div className='flex flex-col sm:flex-row  sm:flex-wrap'>
          <TextComponent textProp={{tag: `Card Holder's Name`, value: userCard.cardHolder}}/>
          <TextComponent textProp={{tag: `Card Number`, value: userCard.cardNumber}}/>
          <TextComponent textProp={{tag: `Issuer`, value: `IO BANK`}}/>
          <TextComponent textProp={{tag: `Card Type`, value: `Master Card`}}/>
          <TextComponent textProp={{tag: `Billing Address`, value: '8, Dexter Avenue P.O Box 10035'}}/>
          <TextComponent textProp={{tag: `Expiration Date`, value: userCard.exp.substring(2,7).replace('-', '/')}}/>
          <TextComponent textProp={{tag: `CVV`, value: userCard.cvv}}/>
        </div>
    </>
  )
}

export default CardDetails
