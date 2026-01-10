import { ChevronLeft, ChevronRight, Edit, Eye, Trash } from "lucide-react";
import { useState } from "react";
import ImageModal from "../ImgModal";

const Table = ({
  data = [],
  columns = [],           
  actions = {},
  itemsPerPage = 10,
  onEdit,
  onView,
  onDelete,
  customActions = []
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [imageModal, setImageModal] = useState({ isOpen: false, url: '' });

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleImageClick = (imageUrl) => {
    setImageModal({ isOpen: true, url: imageUrl });
  };

  const isImageUrl = (value) => {
    if (typeof value !== 'string') return false;
    return /\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i.test(value) ||
           value.startsWith('data:image/') ||
           (value.startsWith('http') && value.includes('image'));
  };

  const showActions = actions.view || actions.edit || actions.delete || customActions.length > 0;

  const renderCellContent = (value, rowIndex, columnKey) => {
    if (isImageUrl(value)) {
      return (
        <img
          src={value}
          alt={`${columnKey}-${rowIndex}`}
          className="w-12 h-12 object-cover rounded cursor-pointer transition-transform hover:scale-110"
          onClick={() => handleImageClick(value)}
        />
      );
    }
    return value ?? '-'; // Fallback for null/undefined
  };

  return (
    <div className="w-full">
      {/* Table Container */}
      <div className="overflow-x-auto rounded-lg shadow-lg mt-6 border border-greenPrimary/30">
        <table className="w-full min-w-max">
          {/* Table Header */}
          <thead className="bg-greenPrimary text-greenBackground">
            <tr className="border-b-2 border-greenPrimary">
              <th className="py-3 px-6 text-left  w-16">
                S.No
              </th>
              {columns.map((columnKey, index) => (
                <th
                  key={index}
                  className="py-3 px-6 text-left"
                >
                  {columnKey.charAt(0).toUpperCase() + columnKey.slice(1)}
                </th>
              ))}
              {showActions && (
                <th className="py-3 px-6 text-left  w-40">
                  Actions
                </th>
              )}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-greenPrimary/20">
            {currentItems.length > 0 ? (
              currentItems.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="hover:bg-greenLight/10 transition-colors"
                >
                  <td className="py-2 px-6 text-greenDark ">
                    {indexOfFirstItem + rowIndex + 1}
                  </td>

                  {columns.map((columnKey, colIndex) => (
                    <td
                      key={colIndex}
                      className="py-2 px-6 text-greenDark"
                    >
                      {renderCellContent(row[columnKey], rowIndex, columnKey)}
                    </td>
                  ))}

                  {showActions && (
                    <td className="py-2 px-6">
                      <div className="flex items-center gap-2">
                        {actions.view && (
                          <button
                            onClick={() => onView?.(row)}
                            className="p-2 rounded-lg bg-greenPrimary/10 hover:bg-greenPrimary/20 text-greenPrimary transition-colors"
                            title="View"
                          >
                            <Eye size={16} />
                          </button>
                        )}
                        {actions.edit && (
                          <button
                            onClick={() => onEdit?.(row)}
                            className="p-2 rounded-lg bg-greenLight/20 hover:bg-greenLight/30 text-greenDarkest transition-colors"
                            title="Edit"
                          >
                            <Edit size={16} />
                          </button>
                        )}
                        {actions.delete && (
                          <button
                            onClick={() => onDelete?.(row)}
                            className="p-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-600 transition-colors"
                            title="Delete"
                          >
                            <Trash size={16} />
                          </button>
                        )}
                        {customActions.map((action, idx) => (
                          <button
                            key={idx}
                            onClick={() => action.onClick?.(row)}
                            className="p-2 rounded-lg transition-colors"
                            style={{
                              backgroundColor: action.bgColor || 'rgba(90, 120, 99, 0.1)',
                              color: action.textColor || '#5A7863'
                            }}
                            title={action.title}
                          >
                            {action.icon}
                          </button>
                        ))}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length + (showActions ? 2 : 1)}
                  className="py-12 text-center  text-greenLight/70 italic"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-6 py-4 mt-6 bg-greenDarkest/80 rounded-lg shadow">
          <div className="text-greenLight">
            Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
            <span className="font-medium">{Math.min(indexOfLastItem, data.length)}</span> of{' '}
            <span className="font-medium">{data.length}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-lg bg-greenPrimary/20 hover:bg-greenPrimary/40 text-greenLight disabled:opacity-40 transition-colors"
            >
              <ChevronLeft size={20} />
            </button>

            {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
              const page = currentPage + i - Math.min(3, currentPage - 1);
              return page > 0 && page <= totalPages ? (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    currentPage === page
                      ? 'bg-greenPrimary text-white'
                      : 'bg-greenDark/40 hover:bg-greenPrimary/30 text-greenLight'
                  }`}
                >
                  {page}
                </button>
              ) : null;
            })}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg bg-greenPrimary/20 hover:bg-greenPrimary/40 text-greenLight disabled:opacity-40 transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}

      {/* Image Modal */}
      <ImageModal
        isOpen={imageModal.isOpen}
        imageUrl={imageModal.url}
        onClose={() => setImageModal({ isOpen: false, url: '' })}
      />
    </div>
  );
};

export default Table;