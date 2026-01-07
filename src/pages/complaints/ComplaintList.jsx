import AddButton from "@/components/common/AddButton";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import Header from "@/components/common/Header";
import Loader from "@/components/common/Loader";
import Modal from "@/components/common/Modal";
import Table from "@/components/common/Table";
import FormInput from "@/components/forms/Formnput";
import {
  useGetQuery,
  usePatchMutation,
  useDeleteMutation,
} from "@/services/apiService";
import { MessageSquareWarning } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";

const sampleComplaints = [
  {
    id: "1",
    Name: "Street light not working",
    Status: "SUBMITTED",
  },
  {
    id: "2",
    Name: "Water supply issue in Sector B",
    Status: "ASSIGNED",
  },
  {
    id: "3",
    Name: "Garbage not collected for 3 days",
    Status: "IN_PROGRESS",
  },
  {
    id: "4",
    Name: "Sewerage overflow near main road",
    Status: "FORWARDED_TO_MC",
  },
  {
    id: "5",
    Name: "Illegal construction complaint",
    Status: "RESOLVED",
  },
  {
    id: "6",
    Name: "Noise pollution at night",
    Status: "DELAYED",
  },
  {
    id: "7",
    Name: "Broken road causing accidents",
    Status: "COMPLETED",
  },
  {
    id: "8",
    Name: "Unauthorized water connection",
    Status: "REJECTED",
  },
];


const ComplaintList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    status: "",
  });

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [complaintToDelete, setComplaintToDelete] = useState(null);

  const {
    data: complaintsData,
    isLoading: complaintsLoading,
    refetch,
  } = useGetQuery({
    path: "/dc/complaints",
  });

  const [updateComplaint, { isLoading: isUpdating }] = usePatchMutation();
  const [deleteComplaint, { isLoading: isDeleting }] = useDeleteMutation();

//   const complaints = complaintsData?.data || []; 
const complaints = sampleComplaints;


  const statusOptions = useMemo(
    () => [
      { value: "SUBMITTED", label: "Submitted" },
      { value: "ASSIGNED", label: "Assigned" },
      { value: "FORWARDED_TO_MC", label: "Forwarded to MC" },
      { value: "ASSIGNED_TO_EMPLOYEE", label: "Assigned to Employee" },
      { value: "IN_PROGRESS", label: "In Progress" },
      { value: "RESOLVED", label: "Resolved" },
      { value: "COMPLETED", label: "Completed" },
      { value: "DELAYED", label: "Delayed" },
      { value: "REJECTED", label: "Rejected" },
    ],
    []
  );

  const handleEdit = (row) => {
    setIsEditMode(true);
    setSelectedComplaint(row);
    setFormData({
      name: row.name || "",
      status: row.status || "SUBMITTED",
    });
    setIsModalOpen(true);
  };

  const handleDelete = (row) => {
    setComplaintToDelete(row);
    setShowDeleteConfirm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Complaint name/title is required");
      return;
    }
    if (!formData.status) {
      toast.error("Please select a status");
      return;
    }

    const payload = {
      name: formData.name.trim(),
      status: formData.status, // already in CAPITAL form
    };

    try {
      await updateComplaint({
        path: `dc/complaints/${selectedComplaint.id}`,
        body: payload,
      }).unwrap();

      toast.success("Complaint updated successfully!");
      setIsModalOpen(false);
      setIsEditMode(false);
      setSelectedComplaint(null);
      setFormData({ name: "", status: "" });
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update complaint");
    }
  };

  const confirmDelete = async () => {
    if (!complaintToDelete) return;

    try {
      await deleteComplaint({
        path: `dc/complaints/${complaintToDelete.id}`,
      }).unwrap();

      toast.success("Complaint deleted successfully!");
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete complaint");
    } finally {
      setShowDeleteConfirm(false);
      setComplaintToDelete(null);
    }
  };

  // Map data for table
  const mappedComplaints = useMemo(() => {
    return complaints.map((complaint) => ({
      id: complaint._id,
      Name: complaint.name || "—",
      Status: complaint.status || "SUBMITTED",
      // You can add more fields like: SubmittedBy, Date, etc.
    }));
  }, [complaints]);

  const columns = ["Name", "Status"];

  return (
    <>
      <Header
        title="Complaints"
        icon={MessageSquareWarning}
        count={complaints.length}
        // If you want to allow creation later, uncomment:
        // actionButton={<AddButton text="Create" onClick={() => {}} />}
      />

      {complaintsLoading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <Loader />
        </div>
      ) : (
        <Table
          columns={columns}
          data={sampleComplaints}
          actions={{
            edit: true,
            delete: true,
          }}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {/* Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setIsEditMode(false);
          setSelectedComplaint(null);
        }}
        title="Edit Complaint"
      >
        <form onSubmit={handleSubmit}>
          <div className="space-y-5">
            <FormInput
              label="Complaint Name/Title"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter complaint title"
              required
            />

            <FormInput
              label="Status"
              type="select"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              options={statusOptions}
              placeholder="Select status"
              required
            />

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={() => {
                  setIsModalOpen(false);
                  setIsEditMode(false);
                  setSelectedComplaint(null);
                }}
                className="px-6 py-2 rounded-lg font-semibold bg-gray-500 hover:bg-gray-600 text-white transition-all"
                disabled={isUpdating}
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isUpdating}
                className="px-6 py-2 rounded-lg font-semibold bg-greenDarkest hover:bg-green-700 text-white transition-all disabled:opacity-50"
              >
                {isUpdating ? "Updating..." : "Update Complaint"}
              </button>
            </div>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={showDeleteConfirm}
        onClose={() => {
          setShowDeleteConfirm(false);
          setComplaintToDelete(null);
        }}
        onConfirm={confirmDelete}
        title="Delete Complaint"
        message={
          complaintToDelete
            ? `Are you sure you want to delete complaint "${complaintToDelete.Name}"? This action cannot be undone.`
            : "Are you sure you want to delete this complaint?"
        }
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={isDeleting}
        variant="danger"
      />
    </>
  );
};

export default ComplaintList;