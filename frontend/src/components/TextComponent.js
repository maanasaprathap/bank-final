import React from 'react'

const TextComponent = ({ textProp }) => {
  return (
    <div className='min-w-200 flex flex-col gap-4 pt-6 w-1/3'>
        <p className='text-sm font-bold'>{textProp.tag}</p>
        <div className='flex flex-1 w-full justify-between text-[12px] sm:text-sm'>
        <p>{textProp.value}</p>
        </div>
    </div>
  )
}

export default TextComponent
