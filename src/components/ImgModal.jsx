import React from 'react'

const ImageModal = ({ isOpen, imageUrl, onClose }) => {
     if (!isOpen) return null;
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
      onClick={onClose}
    >
      <div className="relative max-w-4xl max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 p-2 rounded-full transition-all"
          style={{ backgroundColor: colors.greenDark, color: '#ffffff' }}
        >
          <X size={24} />
        </button>
        <img 
          src={imageUrl} 
          alt="Preview" 
          className="max-w-full max-h-[85vh] rounded-lg"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </div>
  )
}

export default ImageModal
