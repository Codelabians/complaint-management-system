import Button from '@/ui/Button'
import { Search } from 'lucide-react'
import React from 'react'

const NewFolder = () => {
  return (
       <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="relative w-full sm:w-auto">
              <Search
                size={16}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search files..."
                className="w-full lg:w-96 pl-10 pr-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent"
              />
            </div>
        
        <div>
            <Button>
            New Folder
          </Button>
        </div>
          </div>
        </div>
  )
}

export default NewFolder
