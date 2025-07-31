import React, { useEffect, useState } from 'react'
import Transaction from './Transaction'
import CardDetails from '../../components/card/CardDetails'
import CardImage from '../../components/card/CardImage'
import CardFundForm from '../../components/card/CardFundForm'
import CardWithdrawForm from '../../components/card/CardWithdrawForm'
import { useDispatch, useSelector } from 'react-redux'
import CreateCard from '../../components/card/CreateCard'
import { card, creditCard, fetchCard, fetchCardStatus, resetCardStatus } from '../../features/card/cardSlice'
import { closeSpinner, openSpinner, showSpinner } from '../../features/page/pageSlice'
import Spinner from '../../components/Spinner'
import SectionContainer from '../../components/SectionContainer'
import { fetchAccounts } from '../../features/accounts/accountSlice'

const Card = () => {
  const dispatch = useDispatch()
  const status = useSelector(fetchCardStatus)
  const enableSpinner = useSelector(showSpinner)
  const userCard = useSelector(card)
  const [showFundCardForm, setShowFundCardForm] = useState(false)
  const [showWithdrawForm, setShowWithdrawForm] = useState(false)
  const currentPageStyle = showFundCardForm || showWithdrawForm ? 'hidden' : 'flex';

  
  useEffect(() => {
    if(status === 'SUCCESS' || status === 'FAILED'){
      setTimeout(() => {
        dispatch(closeSpinner())
        dispatch(resetCardStatus())
      }, 1000)
    }
  }, [dispatch, status])
  return enableSpinner ? <Spinner /> : !enableSpinner && !userCard ? <SectionContainer id='account-section' extraStyles={`${currentPageStyle} items-center`}><CreateCard /></SectionContainer>
       : 
      <>
        {showFundCardForm && <CardFundForm userCard={userCard} setShowFundCardForm={setShowFundCardForm}/>}
        {showWithdrawForm && <CardWithdrawForm userCard={userCard} setShowWithdrawForm={setShowWithdrawForm}/>}
        <SectionContainer id='account-section' extraStyles={`${currentPageStyle} sm:flex items-center`}>
          {userCard.img && <CardImage userCard={userCard} setShowFundCardForm={setShowFundCardForm}  setShowWithdrawForm={setShowWithdrawForm} />}
        </SectionContainer>
        <SectionContainer extraStyles={`${currentPageStyle} sm:flex `}>
          <CardDetails />
        </SectionContainer>
        {showFundCardForm || showWithdrawForm || <Transaction />}
      </>
   
}

export default Card
