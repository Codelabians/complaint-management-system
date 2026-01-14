// AssignComplaint.jsx (or wherever your assign modal lives)
import { useState, useEffect } from 'react';
import Modal from "@/components/common/Modal";
import FormInput from '@/components/forms/Formnput';

const AssignComplaint = ({
  isOpen,
  onClose,
  complaint,
  employees = [],           // ← array of employee objects from API
  onAssign,
  loading = false,
}) => {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');

  // Reset when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedEmployeeId('');
    }
  }, [isOpen]);

  if (!isOpen || !complaint) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedEmployeeId) return;
    
    onAssign(complaint._id, selectedEmployeeId);
    // Modal will be closed from parent after success
  };

  // Prepare options → value = employee _id, label = only name
  const employeeOptions = employees?.data?.map(emp => ({
    value: emp._id,
    label: emp.name || 'Unknown Employee'
  }));

  // Try to get complaint title from any reasonable field
  const complaintTitle = 
    complaint.title ||
    complaint.Title ||
    complaint.complaint_title ||
    complaint.subject ||
    "—";

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Assign Complaint to Employee"
      maxWidth="max-w-md"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Complaint Title - Readonly */}
        <FormInput
          type="text"
          label="Complaint Title"
          name="title"
          value={complaintTitle}
          className="bg-gray-50 cursor-not-allowed"
          disabled
          readOnly
        />

        {/* Employee Select - only shows names */}
        <FormInput
          type="select"
          label="Assign to Employee"
          name="employee"
          value={selectedEmployeeId}
          onChange={(e) => setSelectedEmployeeId(e.target.value)}
          placeholder="Select employee..."
          options={employeeOptions}
          required
        />

        {/* Buttons */}
        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            disabled={loading}
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading || !selectedEmployeeId}
            className={`
              px-6 py-2 rounded-lg text-white font-medium
              ${loading || !selectedEmployeeId 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-greenDarkest hover:bg-green-700'
              }
            `}
          >
            {loading ? 'Assigning...' : 'Assign'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AssignComplaint;