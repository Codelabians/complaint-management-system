import Heading from '@/common/Heading'
import React, { useState } from 'react'

const Committees = () => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const handleUpdate = () => {
    // Handle update logic here
    console.log('Update clicked with search value:', searchValue);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleUpdate();
    }
  };
  return (
    <div className='w-full amd:w-[80%] mx-auto'>
      <Heading heading="Committees"/>
      <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="px-6 py-4">
        <div className="md:flex items-center justify-between md:gap-x-2 max-w-7xl mx-auto">
          <div className="flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search"
              value={searchValue}
              onChange={handleSearch}
              onKeyPress={handleKeyPress}
              className="w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
            />
          </div>
          <button
            onClick={handleUpdate}
            className=" px-6 py-2 mt-2 md:mt-0  text-sm bg-orange text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            Update Now
          </button>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Committees
