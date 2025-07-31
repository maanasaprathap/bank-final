import React from 'react'

const InputComponent = ({ inputProp }) => {
  return (
    <div className='flex flex-col gap-1 flex-1 w-full mt-2'>
        <label htmlFor={inputProp.field} className='block'>{inputProp.label || 'Email'}</label>
        <input 
            placeholder={inputProp.placeholder || 'Enter Email Address'} 
            type={inputProp.type} id={inputProp.field} 
            className='flex w-full border border-blue-500 p-3 rounded-md focus:border-yellow-400 leading-none' 
            required 
            name={inputProp.field}
            value={inputProp.name}
            onChange={inputProp.handleInputChange}
        />
    </div>
  )
}

export default InputComponent
