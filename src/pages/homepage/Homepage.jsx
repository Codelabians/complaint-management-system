import React from 'react'
import HeroSection from './components/HeroSection'
import CalendarComponent from './components/CalendarComponent'

const Homepage = () => {
  return (
       <div className=" text-center">
      {/* <h1 className="text-3xl font-bold text-gray-800">Welcome to Community Connect</h1>
      <p className="mt-4 text-gray-600">This is the homepage content.</p> */}
      <div>
      <h1 className="text-2xl sm:text-4xl font-semibold font-manrope py-4 sm:py-6">Neighbourhood Events</h1>
        <CalendarComponent/>
      </div>
    </div>
  )
}

export default Homepage
