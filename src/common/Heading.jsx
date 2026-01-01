import React from 'react'

const Heading = ({heading , className}) => {
  return (
    <div>
      <h1 className={`text-3xl font-semibold mb-6 font-manrope ${className}`}>{heading}</h1>
    </div>
  )
}

export default Heading
