import {
  ChevronLeft,
  ChevronRight,
  Edit,
  Eye,
  Trash,
  UserPlus,
} from "lucide-react";
import { useState } from "react";
import ImageModal from "../ImgModal";
import { useSelector } from "react-redux";

const Table = ({
  data = [],
  columns = [],
  actions = {},
  onEdit,
  onDelete,
  onView,
  onAssign = false,
  setPage,
  setPerPage,
  paginationMeta = null,
  itemsPerPage = 10,
}) => {
  const [imageModal, setImageModal] = useState({ isOpen: false, url: "" });

  const user = useSelector((state) => state.auth.user);
  const role = user?.role || "";

  // Role-based permissions
  const isDC = role === "DC";

  const canView = actions.view && onView;
  const canEdit = isDC && actions.edit && onEdit;
  const canDelete = isDC && actions.delete && onDelete;
  const canAssign = actions.assign && onAssign && role === "MC_CO";

  const hasAnyAction = canView || canEdit || canDelete || canAssign;

  const isServerSide = !!paginationMeta;


  const currentPage = isServerSide
    ? paginationMeta.currentPage || paginationMeta.current_page || 1
    : 1;

  const totalPages = isServerSide
    ? paginationMeta.totalPages || paginationMeta.total_pages || 1
    : Math.ceil(data.length / itemsPerPage);

  const totalItems = isServerSide
    ? paginationMeta.totalItems || paginationMeta.total || 0
    : data.length;

  const perPage = isServerSide
    ? paginationMeta.itemsPerPage || paginationMeta.per_page || itemsPerPage
    : itemsPerPage;

  const from = isServerSide
    ? paginationMeta.from || (currentPage - 1) * perPage + 1
    : (currentPage - 1) * perPage + 1;

  const to = isServerSide
    ? paginationMeta.to || Math.min(from + data.length - 1, totalItems)
    : Math.min(from + data.length - 1, totalItems);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      if (isServerSide && setPage) {
        setPage(pageNumber);
      }
    }
  };

  const handleImageClick = (imageUrl) => {
    setImageModal({ isOpen: true, url: imageUrl });
  };

  const isImageUrl = (value) => {
    if (typeof value !== "string") return false;
    return (
      /\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i.test(value) ||
      value.startsWith("data:image/") ||
      (value.startsWith("http") && value.includes("image"))
    );
  };

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
    return value ?? "—";
  };

  return (
    <div className="w-full">
      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow-lg mt-6 border border-greenPrimary/30">
        <table className="w-full min-w-max">
          <thead className="bg-greenPrimary text-greenBackground">
            <tr className="border-b-2 border-greenPrimary">
              <th className="py-3 px-6 text-left w-16">S.No</th>
              {columns.map((col, i) => (
                <th key={i} className="py-3 px-6 text-left">
                  {col}
                </th>
              ))}
              {hasAnyAction && (
                <th className="py-3 px-6 text-left w-48">Actions</th>
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-greenPrimary/20">
            {data.length > 0 ? (
              data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="hover:bg-greenLight/10 transition-colors"
                >
                  <td className="py-2 px-6 text-greenDark">
                    {from + rowIndex}
                  </td>

                  {columns.map((columnKey, colIndex) => (
                    <td key={colIndex} className="py-2 px-6 text-greenDark">
                      {renderCellContent(row[columnKey], rowIndex, columnKey)}
                    </td>
                  ))}

                  {hasAnyAction && (
                    <td className="py-2 px-6">
                      <div className="flex items-center gap-3">
                        {canView && (
                          <button
                            onClick={() => onView(row)}
                            title="View"
                            className="text-green-600 hover:text-green-800 transition-colors"
                          >
                            <Eye size={18} />
                          </button>
                        )}

                        {canEdit && (
                          <button
                            onClick={() => onEdit(row)}
                            title="Edit"
                            className="text-blue-600 hover:text-blue-800 transition-colors"
                          >
                            <Edit size={18} />
                          </button>
                        )}

                        {canDelete && (
                          <button
                            onClick={() => onDelete(row)}
                            title="Delete"
                            className="text-red-600 hover:text-red-800 transition-colors"
                          >
                            <Trash size={18} />
                          </button>
                        )}

                        {canAssign || onAssign && (
                          <button
                            onClick={() => onAssign(row)}
                            title="Assign"
                            className="text-purple-600 hover:text-purple-800 transition-colors"
                          >
                            <UserPlus size={18} />
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length + (hasAnyAction ? 1 : 0)}
                  className="py-12 text-center text-greenLight/70 italic"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination - only show if more than 1 page */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-6 py-4 mt-6 bg-greenDarkest rounded-lg shadow">
          <div className="text-white">
            Showing <span className="font-medium">{from}</span> to{" "}
            <span className="font-medium">{to}</span> of{" "}
            <span className="font-medium">{totalItems}</span> items
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-lg bg-greenPrimary hover:bg-greenPrimary/90 text-white disabled:opacity-40 transition-colors"
            >
              <ChevronLeft size={20} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(
                (p) =>
                  p === 1 || p === totalPages || Math.abs(p - currentPage) <= 2
              )
              .map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    currentPage === page
                      ? "bg-greenPrimary text-white"
                      : "bg-greenDark hover:bg-greenPrimary/80 text-white"
                  }`}
                >
                  {page}
                </button>
              ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg bg-greenPrimary hover:bg-greenPrimary/90 text-white disabled:opacity-40 transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}

      <ImageModal
        isOpen={imageModal.isOpen}
        imageUrl={imageModal.url}
        onClose={() => setImageModal({ isOpen: false, url: "" })}
      />
    </div>
  );
};

export default Table;