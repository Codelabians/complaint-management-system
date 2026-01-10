import { X } from "lucide-react";

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children,
  maxWidth = 'max-w-2xl',
  showCloseButton = true
}) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 b"
      onClick={onClose}
    >
      <div 
        className={`relative w-1/2 ${maxWidth} rounded-lg shadow-2xl bg-white`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 rounded-t-lg text-greenDark" >
          <h2 className="text-2xl font-bold text-#ffffff">{title}</h2>
          {showCloseButton && (
            <button onClick={onClose} className="p-1 rounded-full transition-all hover:bg-opacity-80 text-greenDarkest" >
              <X size={24} />
            </button>
          )}
        </div>

        <div className="px-6 py-6 max-h-[70vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};


export default Modal;