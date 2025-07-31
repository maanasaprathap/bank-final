import React from 'react'
import {fetchTransactionsList } from '../../features/transactions/transactionsSlice'
import { useSelector } from 'react-redux'
import SectionContainer from '../../components/SectionContainer'

const Transaction = () => {
  const transactions = useSelector(fetchTransactionsList)
  const TdItem = ({ content, extraStyle }) => {
    return <td className={`flex flex-1 justify-center text-[12px] ${extraStyle || ''}`}>{content}</td>
  }
  const ThItem = ({ content }) => {
    return <th className='flex justify-center flex-1 text-[12px] '>{content}</th>
  }
  const TransactionItem = ({ transaction }) => {
    return (
      <tr key={transaction.id} className='flex w-full justify-between p-2 pl-6 pr-6'>
        <TdItem content={transaction.createdAt.substring(0,10)}></TdItem>
        <TdItem extraStyle={`text-center`} content={transaction.description}></TdItem>
        <TdItem content={transaction.amount}></TdItem>
        <TdItem content={transaction.type}></TdItem>
        <TdItem content={transaction.status}></TdItem>
        <TdItem content={<button className='text-blue-500 hover:text-blue-900 flex items-center text-sm transition duration-500 ease-in-out'>See More
          </button>}>
        </TdItem>
      </tr>
    )
  }
  return (
    <SectionContainer extraStyles={'overflow-x-auto'} >
      <p className='font-bold text-gray-600 text-sm'>Recent Transactions</p>
        <div className='flex flex-col gap-4 w-screen overflow-x-auto sm:w-full'>
          <table className='flex gap-4 flex-col w-full items-space min-w-500'>
            <thead className='flex w-full'>
              <tr className='flex w-full bg-gray-200 p-2 pl-6 pr-6 justify-between rounded-md'>
                <ThItem content={'Date'}></ThItem>
                <ThItem content={'Description'}></ThItem>
                <ThItem content={'Amount'}></ThItem>
                <ThItem content={'Type'}></ThItem>
                <ThItem content={'Status'}></ThItem>
                <ThItem content={'Info'}></ThItem>
              </tr>
            </thead>
            <tbody className='flex w-full flex-col'>
              {transactions.map((transaction) => <TransactionItem key={transaction.txId} transaction={transaction} />)}
            </tbody>
          </table>
        </div>
    </SectionContainer>
  )
}

export default Transaction
