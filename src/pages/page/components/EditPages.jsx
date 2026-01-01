import React, { useState } from 'react';
import { X } from 'lucide-react';
import Heading from '@/common/Heading';
import Button from '@/ui/Button';

const EditPages = ({ setEditModal, selectedPage }) => {
  const [pageTitle, setPageTitle] = useState(selectedPage?.name || '');
  const [status, setStatus] = useState(selectedPage?.status || 'Published');
  const [order, setOrder] = useState('01'); 

  const handleDiscardChanges = () => {
    setPageTitle('User Details');
    setStatus('Published');
    setOrder('01');
    setEditModal(false);
  };

  const handleUpdatePage = () => {
    console.log('Page updated:', { pageTitle, status, order });
    setEditModal(false);
  };

  const handleClose = () => {
    setEditModal(false);
  };
   const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setEditModal(false);
    }
  };



  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 "
     onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 ">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <Heading heading="Edit Page"/>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} className='hover:text-orange'/>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6 ">
          {/* Page Title Field */}
          <div>
            <label className="block text-sm font-medium  mb-2">
              Page Title
            </label>
            <input
              type="text"
              value={pageTitle}
              onChange={(e) => setPageTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-gray-50"
              placeholder="Enter page title"
            />
          </div>

          {/* Status and Order Row */}
          <div className="grid grid-cols-2 gap-4">
            {/* Status Field */}
            <div>
              <label className="block text-sm font-medium  mb-2">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
              >
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
                <option value="Pending">Pending</option>
              </select>
            </div>

            {/* Order Field */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Order
              </label>
              <input
                type="text"
                value={order}
                onChange={(e) => setOrder(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Enter order"
              />
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
         <Button className="bg-red hover:bg-lightred">
            Discard
         </Button>
       <Button className="bg-orange">
        save Changes
       </Button>
        </div>
      </div>
    </div>
  );
};

export default EditPages;