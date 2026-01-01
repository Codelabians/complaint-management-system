import Heading from '@/common/Heading'
import Button from '@/ui/Button';
import { Plus, Trash2 } from 'lucide-react';
import React, { useState } from 'react'

const members = [
    { id: 1, name: 'Joe Delaney', position: 'President' },
    { id: 2, name: 'Joe Delaney', position: 'President' },
    { id: 3, name: 'Joe Delaney', position: 'President' },
    { id: 4, name: 'Joe Delaney', position: 'President' },
    { id: 5, name: 'Joe Delaney', position: 'President' },
    { id: 6, name: 'Joe Delaney', position: 'President' },
    { id: 7, name: 'Joe Delaney', position: 'President' },
    { id: 8, name: 'Joe Delaney', position: 'President' },
    { id: 9, name: 'Joe Delaney', position: 'President' },
    { id: 10, name: 'Joe Delaney', position: 'President' },
    { id: 11, name: 'Joe Delaney', position: 'President' },
    { id: 12, name: 'Joe Delaney', position: 'President2' }
]

const HoaBoardMembers = () => {
  const [searchTerm, setSearchTerm] = useState('');

     const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

    const handleAddNew = () => {
    console.log('Add New clicked');
  };

  const handleUpdateNow = () => {
    console.log('Update Now clicked');
  };

  const handleDelete = (id) => {
    console.log('Delete member with id:', id);
  };

  return (
     <div className="min-h-screen bg-gray-50 p-6">
      <div className="w-full md:w-[90%] mx-auto">
        <Heading heading="HOA Board Members"/>
        <div className="flex items-center justify-end mb-6">
          <div className="flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent shadow-sm"
            />
          </div>
          <button
            onClick={handleAddNew}
            className="ml-4 flex items-center gap-2 px-4 py-2 bg-orange text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 shadow-sm"
          >
            Add New
            <Plus size={16} />
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold  uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold  uppercase tracking-wider">
                    Position
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold  uppercase tracking-wider">
                    Option
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap text-sm ">
                      {member.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm ">
                      {member.position}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm ">
                      <button
                        onClick={() => handleDelete(member.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors duration-200 p-1"
                        title="Delete member"
                      >
                        <Trash2 size={22} color='black'/>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Update Button */}
        <div className="float-right mt-8">
          <Button
            onClick={handleUpdateNow}
          >
            Update Now
          </Button>
        </div>
      </div>
    </div>
  )
}

export default HoaBoardMembers
