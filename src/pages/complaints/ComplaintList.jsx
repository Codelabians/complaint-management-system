import AddButton from "@/components/common/AddButton";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import Filters from "@/components/common/Filters";
import Header from "@/components/common/Header";
import Loader from "@/components/common/Loader";
import Modal from "@/components/common/Modal";
import Table from "@/components/common/Table";
import FormInput from "@/components/forms/Formnput";
import {
  useGetQuery,
  usePatchMutation,
  useDeleteMutation,
  usePutMutation,
} from "@/services/apiService";
import { MessageSquareWarning } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";

const ComplaintList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    status: "",
  });

  const [filterValues, setFilterValues] = useState({
    search: "",
    status: "",
    categoryId: "",
    dateRange: { start: "", end: "" },
  });

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [complaintToDelete, setComplaintToDelete] = useState(null);


  const queryParams = useMemo(() => {
    const params = new URLSearchParams();
    if (filterValues.search) params.append("search", filterValues.search);
    if (filterValues.status) params.append("status", filterValues.status);
    if (filterValues.categoryId) params.append("categoryId", filterValues.categoryId);
    if (filterValues.dateRange.start) params.append("startDate", filterValues.dateRange.start);
    if (filterValues.dateRange.end) params.append("endDate", filterValues.dateRange.end);
    return params.toString();
  }, [filterValues]);

const {
  data: complaintsData,
  isLoading: complaintsLoading,
  refetch,
} = useGetQuery({
  path: `/dc/complaints${queryParams ? `?${queryParams}` : ""}`,
});

  const { data: categoriesData } = useGetQuery({ path: "/dc/complaint-categories" });
  const categories = categoriesData?.data || [];

  const [updateComplaint, { isLoading: isUpdating }] = usePutMutation();
  const [deleteComplaint, { isLoading: isDeleting }] = useDeleteMutation();

  const complaints = complaintsData?.data || [];

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
      title: row.Title || "",
      status: row.Status ,
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

    if (!formData.title.trim()) {
      toast.error("Complaint title is required");
      return;
    }
    if (!formData.status) {
      toast.error("Please select a status");
      return;
    }

    const payload = {
      title: formData.title.trim(),
      status: formData.status,
    };

    try {
      await updateComplaint({
        path: `dc/complaints/${selectedComplaint._id}`, 
        body: payload,
      }).unwrap();

      toast.success("Complaint updated successfully!");
      setIsModalOpen(false);
      setIsEditMode(false);
      setSelectedComplaint(null);
      setFormData({ title: "", status: "" });
      refetch();
    } catch (error) {
      toast.error(
        error?.data?.error ||
        error?.data?.message ||
        "Failed to update complaint"
      );
    }
  };

  const confirmDelete = async () => {
    if (!complaintToDelete) return;

    try {
      await deleteComplaint({
        path: `dc/complaints/${complaintToDelete._id}`,
      }).unwrap();

      toast.success("Complaint deleted successfully!");
      refetch();
    } catch (error) {
      toast.error(
        error?.data?.error ||
        error?.data?.message ||
        "Failed to delete complaint"
      );
    } finally {
      setShowDeleteConfirm(false);
      setComplaintToDelete(null);
    }
  };

const getImageUrl = (imagesStr) => {
  if (!imagesStr || typeof imagesStr !== 'string') return null;
  
 
  const cleaned = imagesStr.replace(/[<>]/g, '').trim();
  
  if (cleaned.startsWith('http') && /\.(jpg|jpeg|png|gif|webp)$/i.test(cleaned)) {
    return cleaned;
  }
  return null;
};

  const mappedComplaints = useMemo(() => {
    return complaints.map((complaint) => ({
      id: complaint._id,              
      _id: complaint._id,             
      Title: complaint.title || "—",
      Status: complaint.status || "SUBMITTED",
      Location: complaint.locationName || "—",
      Area: complaint.areaType || "—",
      Volunteer: complaint.createdByVolunteerId?.name || "—",
      Submitted: new Date(complaint.createdAt).toLocaleDateString(),
      Image: getImageUrl(complaint.images),
    }));
  }, [complaints]);

  const columns = [
    "Image",
    "Title",
    "Status",
    "Location",
    "Area",
    "Volunteer",
    "Submitted",
  ];

  const complaintFilters = [
    {
      key: "search",
      type: "text",
      label: "Search",
      placeholder: "Title, description...",
    },
    {
      key: "status",
      type: "select",
      label: "Status",
      allLabel: "All Statuses",
      options: [
        { value: "SUBMITTED", label: "Submitted" },
        { value: "pending", label: "Pending" },
        { value: "progress", label: "In Progress" },
        { value: "resolveByEmployee", label: "Resolved by Employee" },
        { value: "RESOLVED", label: "Resolved" },
        // ... add others as needed
      ],
    },
    {
      key: "categoryId",
      type: "select",
      label: "Category",
      allLabel: "All Categories",
      options: categories.map((cat) => ({
        value: cat._id,
        label: cat.name || cat.title,
      })),
    },
    {
      key: "dateRange",
      type: "dateRange",
      label: "Date Range",
    },
  ];

  return (
    <>
      <Header
        title="Complaints"
        icon={MessageSquareWarning}
        count={complaints.length}
      />

      <Filters
        filters={complaintFilters}
        values={filterValues}
        onChange={setFilterValues}
      />

      {complaintsLoading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <Loader />
        </div>
      ) : (
        <Table
          columns={columns}
          data={mappedComplaints}
          actions={{
            // edit: true,
            // delete: true,
          }}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {/* <Modal
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
              label="Complaint Title"
              name="title"
              value={formData.title}
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
                onClick={() => setIsModalOpen(false)}
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
      </Modal> */}

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
            ? `Are you sure you want to delete "${complaintToDelete.Title}"? This action cannot be undone.`
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