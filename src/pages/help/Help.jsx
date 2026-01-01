import Heading from '@/common/Heading'
import InputField from '@/common/InputField'
import Button from '@/ui/Button'
import CustomBox from '@/widgets/layout/CustomBox'
import React, { useState } from 'react'

const Help = () => {

  const [name , setName] = useState('')
  const [errors , setErrors] = useState('')
  return (
      <div className='w-full md:w-[90%] mx-auto'>
      <Heading heading="Contact Us"/>
       <CustomBox>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-x-6'>
         
          <InputField
           label="Name"
           type='text'
           value={name}
           placeholder="john"
           errors={errors}
          />
          <InputField
           label="Email"
           type='email'
           value={name}
           placeholder="@gmail.com"
           errors={errors}
          />
             
           <InputField
           label="Name"
           type='text'
           value={name}
           errors={errors}
          />
        </div>
        <Button className="float-right">Send Message</Button>
      </CustomBox>
    </div>
  )
}

export default Help
