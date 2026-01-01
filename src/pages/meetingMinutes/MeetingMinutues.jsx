import Heading from '@/common/Heading';
import Button from '@/ui/Button';
import { Download, Edit, Eye, Plus, Search, Share, Trash2 } from 'lucide-react';
import React, { useState } from 'react'

const MeetingMinutues = () => {
     const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const documents = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    name: 'May 2025 Meeting Minutes',
    month: '06',
    date: '2025',
    file: 'Monthly-meeting-minutes-2025-05.pdf'
  }));

  const filteredDocuments = documents.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.file.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const itemsPerPage = 12;
  const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentDocuments = filteredDocuments.slice(startIndex, startIndex + itemsPerPage);

  const handleAction = (action, docId) => {
    console.log(`${action} action for document ${docId}`);
  };
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="w-full md:w-[90%] mx-auto">
        <Heading heading="Monthly Meeting Minutes"/>
        {/* Search Bar */}
        <div className="mb-6 flex justify-end gap-4">
          <Button>
            <Plus />
            Add New
          </Button>
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>

        {/* Documents Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Name</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Month</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Date</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">File</th>
                  <th className="text-right py-4 px-6 font-semibold text-gray-900">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {currentDocuments.map((doc, index) => (
                  <tr key={doc.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 font-medium">{doc.name}</td>
                    <td className="py-4 px-6 ">{doc.month}</td>
                    <td className="py-4 px-6 ">{doc.date}</td>
                    <td className="py-4 px-6 text-sm">{doc.file}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleAction('edit', doc.id)}
                          className="p-2  hover:text-orange rounded-lg transition-all"
                          title="Edit"
                        >
                          <Edit size={22} />
                        </button>
                        <button
                          onClick={() => handleAction('view', doc.id)}
                          className="p-2 hover:text-orange rounded-lg transition-all"
                          title="View"
                        >
                          <Eye size={22} />
                        </button>
                        <button
                          onClick={() => handleAction('share', doc.id)}
                          className="p-2 hover:text-orange hover:bg-purple-50 rounded-lg transition-all"
                          title="Share"
                        >
                          <Download size={22} />
                        
                        </button>
                        <button
                          onClick={() => handleAction('delete', doc.id)}
                          className="p-2  hover:text-orange rounded-lg transition-all"
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

          {/* Empty State */}
          {filteredDocuments.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
              <p className="text-gray-500">Try adjusting your search terms</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-600">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredDocuments.length)} of {filteredDocuments.length} documents
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Previous
              </button>
              
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                    currentPage === i + 1
                      ? 'bg-orange-500 text-white'
                      : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MeetingMinutues
