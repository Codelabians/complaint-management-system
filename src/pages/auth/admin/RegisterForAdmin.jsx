import CommunityHero from '@/components/communityHero'
import React from 'react'
import AdminForm from './AdminForm'

const RegisterForAdmin = () => {
  return (
     <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-6xl w-full bg-white rounded-lg shadow-2xl overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Left Side - Hero */}
          <CommunityHero />

          {/* Right Side - Role Selection */}
           <AdminForm/>
        </div>
      </div>
    </div>
  )
}

export default RegisterForAdmin
