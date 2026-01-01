import Heading from '@/common/Heading';
import { Download, FileText } from 'lucide-react';
import React from 'react'


const DOCUMENTS = [
  { id: 1, title: 'Stonebridge Combined Legal Document', featured: true },
  { id: 2, title: 'Stonebridge Combined Legal Document', featured: false },
  { id: 3, title: 'Stonebridge Combined Legal Document', featured: false },
  { id: 4, title: 'Stonebridge Combined Legal Document', featured: false },
  { id: 5, title: 'Stonebridge Combined Legal Document', featured: false },
];

const CommonDocuments = () => {

      const handleDownload = (id, title) => {
    console.log(`Downloading document ${id}: ${title}`);
      }

  return (
     <div className="min-h-screen bg-gray-100 p-6">
      <div className="w-full md:w-[90%] mx-auto">
        <Heading heading="Common Documents"/>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DOCUMENTS.map((document) => (
            <div
              key={document.id}
              className={`bg-white rounded-lg shadow-sm p-6 transition-all duration-200 hover:shadow-md`}
            >
              {/* PDF Icon */}
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <FileText size={48}/>

                </div>
              </div>

              {/* Document Title */}
              <div className="text-center mb-6">
                <h3 className="text-sm font-medium leading-snug">
                  {document.title}
                </h3>
              </div>

              {/* Download Button */}
              <div className="flex justify-center">
                <button
                  onClick={() => handleDownload(document.id, document.title)}
                  className="flex items-center gap-2 px-6 py-2 bg-orange text-white text-sm font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                >
                  <Download size={16} />
                  Download PDF
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CommonDocuments
