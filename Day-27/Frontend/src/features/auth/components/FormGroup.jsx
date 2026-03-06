import React from 'react'

const formGroup = ({label}) => {
  return (
    <div className='formGroup'>
        <label className='label'>{label}</label>
        <input className='input' type="text" placeholder={label} />
      
    </div>
  )
}

export default formGroup
