import AddButton from "@/components/common/AddButton";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import Header from "@/components/common/Header";
import Loader from "@/components/common/Loader";
import Modal from "@/components/common/Modal";
import Table from "@/components/common/Table";
import FormInput from "@/components/forms/Formnput";
import {
  useGetQuery,
  usePostMutation,
  usePatchMutation,
  useDeleteMutation,
} from "@/services/apiService";
import { Users, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";

const columns = ["Name", "Officer", "Employees"];

const DCList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedDC, setSelectedDC] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
  });

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [dcToDelete, setDcToDelete] = useState(null);

  const {
    data: dcsData,
    isLoading: dcLoading,
    refetch,
  } = useGetQuery({ path: "district-council/all" });

  const [createDC, { isLoading: isCreating }] = usePostMutation();
  const [updateDC, { isLoading: isUpdating }] = usePatchMutation();
  const [deleteDC, { isLoading: isDeleting }] = useDeleteMutation();

  const dcs = dcsData?.data || []; 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = () => {
    setIsEditMode(false);
    setSelectedDC(null);
    setFormData({ name: "" });
    setIsModalOpen(true);
  };

  const handleEdit = (row) => {
    setIsEditMode(true);
    setSelectedDC(row);
    setFormData({
      name: row.Name || "",
    });
    setIsModalOpen(true);
  };

  const handleDelete = (row) => {
    setDcToDelete(row);
    setShowDeleteConfirm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("District Council name is required");
      return;
    }

    const payload = {
      name: formData.name.trim(),
    };

    try {
      if (isEditMode) {
        await updateDC({
          path: `district-council/${selectedDC.id}`,
          body: payload,
        }).unwrap();

        toast.success("District Council updated successfully!");
      } else {
        await createDC({
          path: "district-council/create",
          body: payload,
        }).unwrap();

        toast.success("District Council created successfully!");
      }

      setIsModalOpen(false);
      setIsEditMode(false);
      setSelectedDC(null);
      setFormData({ name: "" });

      refetch();
    } catch (error) {
      toast.error(error?.data?.message || "Operation failed");
    }
  };

  const confirmDelete = async () => {
    if (!dcToDelete) return;

    try {
      await deleteDC({
        path: `district-council/${dcToDelete.id}`,
      }).unwrap();

      toast.success("District Council deleted successfully!");
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete district council");
    } finally {
      setShowDeleteConfirm(false);
      setDcToDelete(null);
    }
  };

  const mappedDCs = useMemo(() => {
    return dcs.map((dc) => ({
      id: dc._id,
      Name: dc.name || "—",
      Officer: dc.officer ? dc.officer.name : "Not Assigned",
      Employees: dc.employees?.length || 0,
    }));
  }, [dcs]);

  return (
    <>
      <Header
        title="District Councils"
        icon={Users}
        count={dcs.length}
        actionButton={<AddButton text="Create DC" onClick={handleCreate} />}
      />

      {/* {dcLoading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <Loader />
        </div>
      ) : ( */}
        <Table
          columns={columns}
          data={mappedDCs}
          actions={{
            edit: true,
            delete: true,
          }}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      {/* )} */}

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setIsEditMode(false);
          setSelectedDC(null);
        }}
        title={isEditMode ? "Edit District Council" : "Create District Council"}
      >
        <form onSubmit={handleSubmit}>
          <div className="space-y-5">
            <FormInput
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter District Council Name"
              required
            />

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={() => {
                  setIsModalOpen(false);
                  setIsEditMode(false);
                  setSelectedDC(null);
                }}
                className="px-6 py-2 rounded-lg font-semibold bg-gray-500 hover:bg-gray-600 text-white transition-all"
                disabled={isCreating || isUpdating}
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isCreating || isUpdating}
                className="px-6 py-2 rounded-lg font-semibold bg-greenDarkest hover:bg-green-700 text-white transition-all disabled:opacity-50"
              >
                {isCreating || isUpdating
                  ? isEditMode
                    ? "Updating..."
                    : "Creating..."
                  : isEditMode
                  ? "Update DC"
                  : "Add DC"}
              </button>
            </div>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={showDeleteConfirm}
        onClose={() => {
          setShowDeleteConfirm(false);
          setDcToDelete(null);
        }}
        onConfirm={confirmDelete}
        title="Delete District Council"
        message={
          dcToDelete
            ? `Are you sure you want to delete "${dcToDelete.Name}"? This action cannot be undone.`
            : "Are you sure you want to delete this district council?"
        }
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={isDeleting}
        variant="danger"
      />
    </>
  );
};

export default DCList;