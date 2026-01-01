import React from 'react'

const CustomBox = ({children}) => {
  return (
    <div className='h-96 w-[95%] bg-white p-4'>
      {children}
    </div>
  )
}

export default CustomBox
