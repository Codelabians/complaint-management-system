import React, { useState } from "react";
import { Edit, Eye, Trash2 } from "lucide-react";

const DynamicTable = ({ columns, data, actions, rowsPerPage = 10 }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / rowsPerPage);

  // Slice data for current page
  const paginatedData = data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i); 
        }
      } else if (currentPage >= totalPages - 2) {
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pages.push(i);
        }
      }
    }

    return pages;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="overflow-x-auto">
        <table className="min-w-[95%] mx-auto  text-sm">
          <thead className="bg-gray-50 ">
            <tr className="mt-8 " >
              {columns.map((col, index) => (
                <th key={index} className="px-6 py-4 font-semibold">
                  {col.header}
                </th>
              ))}
              {actions && <th className="px-6 py-4 font-semibold">Action</th>}
            </tr>
          </thead>

          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-gray-50">
                  {columns.map((col, colIndex) => (
                    <td key={colIndex} className="px-6 py-4 text-center text-gray-900">
                      {col.accessor === "status" ? (
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium 
      ${
        row[col.accessor] === "Active"
          ? "bg-green text-green-800"
          : "bg-lightred text-red-800"
      }`}
                        >
                          {row[col.accessor]}
                        </span>
                      ) : (
                        row[col.accessor]
                      )}
                    </td>
                  ))}
                  {actions && (
                    <td className="px-6 py-4 ">
                      <div className="flex items-center justify-center gap-2">
                        {actions.map((action, actionIndex) => {
                          const Icon = action.icon;
                          return (
                            <button
                              key={actionIndex}
                              onClick={() => action.onClick(row)}
                              className="p-1.5 hover:bg-gray-100  rounded"
                            >
                              <Icon size={20}  />
                            </button>
                          );
                        })}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length + (actions ? 1 : 0)}
                  className="px-6 py-8 text-center text-gray-500"
                >
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-end items-center gap-1 py-4 px-6 ">
          {getPageNumbers().map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              className={`w-8 h-8 flex items-center justify-center text-sm font-medium rounded-full transition-colors ${
                currentPage === pageNum
                  ? "bg-orange text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {pageNum}
            </button>
          ))}

          {currentPage < totalPages && (
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="ml-2 px-3 py-1.5 text-sm "
            >
              Next →
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default DynamicTable;
