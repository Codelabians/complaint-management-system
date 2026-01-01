import Heading from '@/common/Heading';
import Button from '@/ui/Button';
import { ChevronRight, Download, ExternalLink, Eye, Plus, Trash2 } from 'lucide-react';
import React, { useState } from 'react'


const NEWSLETTER_DATA = [
  { id: 1, name: 'June 2025 Newsletter', month: '06', date: '2025', file: 'Newsletter-2025-06.pdf' },
  { id: 2, name: 'June 2025 Newsletter', month: '06', date: '2025', file: 'Newsletter-2025-06.pdf' },
  { id: 3, name: 'June 2025 Newsletter', month: '06', date: '2025', file: 'Newsletter-2025-06.pdf' },
  { id: 4, name: 'June 2025 Newsletter', month: '06', date: '2025', file: 'Newsletter-2025-06.pdf' },
  { id: 5, name: 'June 2025 Newsletter', month: '06', date: '2025', file: 'Newsletter-2025-06.pdf' },
  { id: 6, name: 'June 2025 Newsletter', month: '06', date: '2025', file: 'Newsletter-2025-06.pdf' },
  { id: 7, name: 'June 2025 Newsletter', month: '06', date: '2025', file: 'Newsletter-2025-06.pdf' },
  { id: 8, name: 'June 2025 Newsletter', month: '06', date: '2025', file: 'Newsletter-2025-06.pdf' },
  { id: 9, name: 'June 2025 Newsletter', month: '06', date: '2025', file: 'Newsletter-2025-06.pdf' },
  { id: 10, name: 'June 2025 Newsletter', month: '06', date: '2025', file: 'Newsletter-2025-06.pdf' },
  { id: 11, name: 'June 2025 Newsletter', month: '06', date: '2025', file: 'Newsletter-2025-06.pdf' },
  { id: 12, name: 'June 2025 Newsletter', month: '06', date: '2025', file: 'Newsletter-2025-06.pdf' },
];


const NewsLetter = () => {

      const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

   const filteredNewsletters = NEWSLETTER_DATA.filter(newsletter =>
    newsletter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    newsletter.file.toLowerCase().includes(searchTerm.toLowerCase()) ||
    newsletter.month.includes(searchTerm) ||
    newsletter.date.includes(searchTerm)
  );

  const totalPages = Math.ceil(filteredNewsletters.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentNewsletters = filteredNewsletters.slice(startIndex, startIndex + itemsPerPage);

  const handleAddNew = () => {
    console.log('Add New newsletter');
  };

  const handleEdit = (id) => {
    console.log('Edit newsletter:', id);
  };

  const handleView = (id) => {
    console.log('View newsletter:', id);
  };

  const handleDownload = (id) => {
    console.log('Download newsletter:', id);
  };

  const handleDelete = (id) => {
    console.log('Delete newsletter:', id);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="w-full md:w-[90%] mx-auto">
        <Heading heading="Newsletter"/>
        {/* Search */}
        <div className="mb-6 flex justify-end gap-4">
          <Button>
            <Plus/>
            Add New
          </Button>
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md px-4 py-2 border-2 rounded-lg focus:outline-none focus:border-orange bg-white"
          />
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold ">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold ">
                    Month
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold ">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold ">
                    File
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentNewsletters.map((newsletter) => (
                  <tr key={newsletter.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {newsletter.name}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {newsletter.month}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {newsletter.date}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {newsletter.file}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleEdit(newsletter.id)}
                          className=" hover:text-orange transition-colors duration-200"
                          title="Edit"
                        >
                          <ExternalLink size={22} />
                        </button>
                        <button
                          onClick={() => handleView(newsletter.id)}
                          className=" hover:text-orange transition-colors duration-200"
                          title="View"
                        >
                          <Eye size={22} />
                        </button>
                        <button
                          onClick={() => handleDownload(newsletter.id)}
                          className=" hover:text-orange transition-colors duration-200"
                          title="Download"
                        >
                          <Download size={22} />
                        </button>
                        <button
                          onClick={() => handleDelete(newsletter.id)}
                          className=" hover:text-orange transition-colors duration-200"
                          title="Delete"
                        >
                          <Trash2 size={22} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        <div className="flex items-center justify-end me-4">
          {/* Pagination */}
          <div className="flex items-center space-x-3">
            <span className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
              {currentPage}
            </span>
            <span className="w-8 h-8 text-gray-600 rounded-full flex items-center justify-center text-sm cursor-pointer hover:bg-gray-100">
              2
            </span>
            <span className="w-8 h-8 text-gray-600 rounded-full flex items-center justify-center text-sm cursor-pointer hover:bg-gray-100">
              3
            </span>
            <button
              onClick={handleNextPage}
              className="flex items-center text-orange text-sm font-medium ml-2"
              disabled={currentPage >= totalPages}
            >
              Next
              <ChevronRight size={16} className="ml-1" />
            </button>
          </div>
        </div>

        </div>f
      </div>
    </div>
  )
}

export default NewsLetter
