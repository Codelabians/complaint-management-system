import React from 'react';

const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Deletion",
  message = "Are you sure you want to delete this item? This action cannot be undone.",
  confirmText = "Delete",
  cancelText = "Cancel",
  isLoading = false,
  // variant = "danger", 
}) => {
  if (!isOpen) return null;

  // const variantStyles = {
  //   danger: {
  //     button: "bg-red-600 hover:bg-red-700",
  //     title: "text-red-600",
  //   },
  //   warning: {
  //     button: "bg-amber-600 hover:bg-amber-700",
  //     title: "text-amber-600",
  //   },
  //   info: {
  //     button: "bg-blue-600 hover:bg-blue-700",
  //     title: "text-greenDarkest",
  //   },
  // };

  // const style = variantStyles[variant] || variantStyles.danger;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-200">
          <h3 className={`text-xl font-semibold }`}>{title}</h3>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          <p className="text-gray-700">{message}</p>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="px-5 py-2.5 rounded-lg border border-gray-300 hover:bg-gray-100 font-medium transition-colors disabled:opacity-50"
          >
            {cancelText}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className={`px-5 py-2.5 rounded-lg bg-greenDarkest text-white font-medium transition-colors flex items-center gap-2 disabled:opacity-50 `}
          >
            {isLoading ? (
              <>
                <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                <span>Processing...</span>
              </>
            ) : (
              confirmText
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;