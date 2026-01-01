import Heading from '@/common/Heading'
import React from 'react'
import HeroSection from '../homepage/components/HeroSection'


const documents = [
  {
    id: 1,
    title: "Stonebridge Combined Legal Document",
    buttonText: "View Report",
    onClick: () => console.log("Opening report..."), // Replace with your logic
  },
];


const WebLinks = () => {
  return (
    <div >
      {/* <HeroSection/> */}
       <Heading heading="Web Links" className="text-center py-4"/>
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 w-full md:w-[90%] mx-auto">
      {documents.map((doc) => (
        <div
          key={doc.id}
          className="bg-white p-6 rounded-xl shadow-md text-center flex flex-col items-center justify-between min-h-[160px]"
        >
          <p className="text-sm font-medium text-gray-800 mb-6">
            {doc.title}
          </p>
          <button
            onClick={doc.onClick}
            className="bg-orange text-white px-6 py-2 text-sm rounded-lg hover:bg-orange-600 transition"
          >
            {doc.buttonText}
          </button>
        </div>
      ))}
    </div>
    </div>
  )
}

export default WebLinks
