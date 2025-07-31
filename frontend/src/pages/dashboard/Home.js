import Transaction from './Transaction'
import { useDispatch, useSelector } from 'react-redux'
import { accounts, fetchAccounts } from '../../features/accounts/accountSlice'
import Payment from './Payment'
import { useNavigate } from 'react-router-dom'
import SectionContainer from '../../components/SectionContainer'
import { useEffect } from 'react'

const Home = () => {
  const accountList = useSelector(accounts)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const navigateCurrency = (code) => {
    navigate(`/dashboard/accounts?currency=${code}`)
  }
  useEffect(() => {
    dispatch(fetchAccounts())
  }, [])
  return (
    <>
      <SectionContainer extraStyle={'overflow-x-auto'} >
        <p className='font-bold text-gray-600'>Accounts & Balances</p>
        <div className='flex flex-col sm:flex-row gap-6 sm:flex-wrap'>
          {
            accountList.map((acc, id) => <div key={id} className={`bg-gray-100 flex flex-1 sm:min-w-[200px] sm:max-w-[300px] flex-col gap-4 p-6 border border-gray-200 rounded-lg hover:border-blue-500 hover:cursor-pointer text-gray-600 flex transform transition duration-500 ease-in-out hover:translate-x-2`} onClick={() => navigateCurrency(acc.code)}>
                <img className='w-full h-full object-cover' src={acc.flag}/>
                <p className='text-sm'>{acc.label}</p>
                <div className='flex flex-1 w-full justify-between'>
                  <p>{acc.symbol}{acc.balance.toString().substring(0,8)}</p>
                  <p>{acc.code}</p>
                </div>
            </div>)
          }
        </div>
      </SectionContainer>
      <Payment />
      <section>
        <Transaction />
      </section>
    </>
  )
}

export default Home
