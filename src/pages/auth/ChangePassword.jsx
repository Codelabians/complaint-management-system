import InputField from '@/common/InputField'
import CommunityHero from '@/components/communityHero'
import React, { useState } from 'react'

const ChangePassword = () => {
  
     const [formData, setFormData] = useState({
        password: '',
        confirmPassword : ''
      });
      const [errors , setErrors ] = useState('')
 
      const handleInputChange = () => {
        console.log("changed")
      }
        const handleBlur = () => {
        console.log("blurred")
      }

  return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-6xl w-full bg-white rounded-lg shadow-2xl overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Left Side - Hero */}
          <CommunityHero />

          {/* Right Side - Role Selection */}
              <div className="lg:w-[40%] mx-auto flex flex-col justify-center px-8 py-6">
            <h1 className="text-2xl font-semibold my-4 font-manrope">
             Change Your password?
            </h1>
            <p className='font-manrope'>Enter your email and we'll send you verification code to rest your password</p>
            <div className="flex flex-col gap-y-3 mt-4">
              <InputField
                label="New Password"
                field="password"
                type="password"
                placeholder="New Password"
                value={formData.password}
                onChange={handleInputChange}
                onBlur={handleBlur}
                errors={errors}
              />
                <InputField
                label="Confirm Password"
                field="password"
                type="password"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                onBlur={handleBlur}
                errors={errors}
              />
            
              {/* Forgot Password */}
              <div className="flex justify-end text-sm mb-2">
               
              </div>
              <button className="w-full bg-orange hover:bg-orange-600 text-white font-semibold font-manrope py-3 px-6 rounded-lg transition-colors mb-3">
               Continue
              </button>
             
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChangePassword
