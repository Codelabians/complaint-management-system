import { useState } from "react";
import ConfirmDialog from "./ConfirmDialog";


const ToggleSwitch = ({
  isChecked,
  onToggle,
  dialogTitle = "Confirm Change",
  dialogMessage = "Are you sure you want to change this setting?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "info",
  disabled = false,
  label = "",
  showDialog = true,
}) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pendingValue, setPendingValue] = useState(null);

  const handleToggleClick = () => {
    const newValue = !isChecked;
    
    if (showDialog) {
      setPendingValue(newValue);
      setShowConfirm(true);
    } else {
      onToggle(newValue);
    }
  };

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await onToggle(pendingValue);
      setShowConfirm(false);
      setPendingValue(null);
    } catch (error) {
      console.error('Toggle error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setShowConfirm(false);
    setPendingValue(null);
  };

  return (
    <>
      <div className="flex items-center gap-3">
        {label && <span className="text-gray-700 font-medium">{label}</span>}
        
        <button
          type="button"
          onClick={handleToggleClick}
          disabled={disabled}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-greenPrimary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${
            isChecked ? 'bg-greenDark' : 'bg-gray-300'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              isChecked ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      <ConfirmDialog
        isOpen={showConfirm}
        onClose={handleCancel}
        onConfirm={handleConfirm}
        title={dialogTitle}
        message={dialogMessage}
        confirmText={confirmText}
        cancelText={cancelText}
        isLoading={isLoading}
        variant={variant}
      />
    </>
  );
};

export default ToggleSwitch;

