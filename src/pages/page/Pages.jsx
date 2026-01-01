import React, { useState } from 'react';
import { Search, Plus, Trash2, Edit, Eye, Trash, Pencil } from 'lucide-react';
import Heading from '@/common/Heading';
import Button from '@/ui/Button';
import EditPages from './components/EditPages';

const Pages = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPage, setSelectedPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [editModal , setEditModal] = useState(false);

  const tableData = [
    { name: 'User Details', status: 'Publish' },
    { name: 'Email Preference', status: 'Publish' },
    { name: 'Committees', status: 'Publish' },
    { name: 'HOA Board', status: 'Publish' },
    { name: 'Member Directory', status: 'Publish' },
    { name: 'Newsletter', status: 'Publish' },
    { name: 'Common Documents', status: 'Publish' },
    { name: 'Monthly Meeting Minutes', status: 'Publish' },
    { name: 'Financial Documents', status: 'Publish' },
    { name: 'Board Documents', status: 'Publish' },
    { name: 'Calendars & Reservation', status: 'Publish' },
    { name: 'Help', status: 'Publish' }
  ];

  const filteredData = tableData.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

 const handleEdit  = (item) => {
  
   setSelectedPage(item);
    setEditModal(true);
    console.log(selectedPage, "selected page");
 }

  return (
    <div className="bg-gray-50  p-6">
      <Heading heading='Page Management'/>
      <div className=" rounded-lg shadow-sm">
        
        <div className="p-4 border-b border-gray-200 flex items-center justify-end gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
           
          </div>
         <Button>
              Add New
            </Button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-3 px-6 font-semibold">Name</th>
                <th className="text-left py-3 px-6 font-semibold">Status</th>
                <th className="text-left py-3 px-6 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 ">{item.name}</td>
                  <td className="py-4 px-6">
                    <span className="">{item.status}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-1">
                       <Trash/>
                      <Pencil onClick={() => handleEdit(item)}/>
                      <Eye/>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {editModal && selectedPage &&(
          <EditPages 
          setEditModal={setEditModal}
           selectedPage={selectedPage}
          />
        )}
        {/* Pagination */}
      {/* Pagination */}
        <div className="p-4 border-t border-gray-200 flex items-center justify-end gap-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="w-8 h-8 rounded-full bg-orange text-white flex items-center justify-center text-sm font-medium hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            1
          </button>
          <button
            onClick={() => setCurrentPage(2)}
            className="w-8 h-8 rounded-full border border-gray-300 text-gray-600 flex items-center justify-center text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            2
          </button>
          <button
            onClick={() => setCurrentPage(3)}
            className="w-8 h-8 rounded-full border border-gray-300 text-gray-600 flex items-center justify-center text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            3
          </button>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
    
  );
};

export default Pages;