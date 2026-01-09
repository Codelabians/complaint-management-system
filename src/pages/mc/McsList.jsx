import React, { useMemo, useState } from "react";
import { toast } from "react-toastify";
import {
  useGetQuery,
  usePostMutation,
  usePutMutation,
  useDeleteMutation,
} from "@/services/apiService";
import { Building2, Trash2 } from "lucide-react";

import AddButton from "@/components/common/AddButton";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import Header from "@/components/common/Header";
import Loader from "@/components/common/Loader";
import Modal from "@/components/common/Modal";
import Table from "@/components/common/Table";
import FormInput from "@/components/forms/Formnput";

const columns = ["Name", "District", "Tehsil", "Status"];

const McsList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedMc, setSelectedMc] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    zilaId: "",
    tehsilId: "",
  });

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [mcToDelete, setMcToDelete] = useState(null);

  const { data: districtsData } = useGetQuery({ path: "zila/all" });
  const districts = districtsData?.data || [];

  const { data: tehsilsData } = useGetQuery({ path: "tehsil/all" });
  const tehsils = tehsilsData?.tehsils || [];

  const {
    data: mcsData,
    isLoading: mcsLoading,
    refetch,
  } = useGetQuery({ path: "dc/all/mcs" }); 

  const [createMc, { isLoading: isCreating }] = usePostMutation();
  const [updateMc, { isLoading: isUpdating }] = usePutMutation();
  const [deleteMc, { isLoading: isDeleting }] = useDeleteMutation();

  const districtOptions = useMemo(() => 
    districts.map(zila => ({
      value: zila._id,
      label: zila.name
    })), 
  [districts]);

  const tehsilOptions = useMemo(() => {
    if (!formData.zilaId) return [];
    return tehsils
      .filter(t => t.zilaId?._id === formData.zilaId)
      .map(t => ({
        value: t._id,
        label: t.name
      }));
  }, [tehsils, formData.zilaId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newData = { ...prev, [name]: value };
      
      if (name === "zilaId") {
        newData.tehsilId = "";
      }
      
      return newData;
    });
  };

  const handleCreate = () => {
    setIsEditMode(false);
    setSelectedMc(null);
    setFormData({
      name: "",
      zilaId: "",
      tehsilId: "",
    });
    setIsModalOpen(true);
  };

  const handleEdit = (row) => {
    const original = row.original;

    if (!original) {
      toast.error("Missing original MC data");
      return;
    }

    setIsEditMode(true);
    setSelectedMc(original);

    setFormData({
      name: original.name || "",
      zilaId: original.zilaId?._id || original.zilaId || "",
      tehsilId: original.tehsilId?._id || "",
    });

    setIsModalOpen(true);
  };

  const handleDelete = (row) => {
    setMcToDelete(row);
    setShowDeleteConfirm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) return toast.error("Name is required");
    if (!formData.zilaId) return toast.error("District is required");
    if (!formData.tehsilId) return toast.error("Tehsil is required");

    const payload = {
      name: formData.name.trim(),
      zilaId: formData.zilaId,
      tehsilId: formData.tehsilId,
    };

    try {
      if (isEditMode) {
        await updateMc({
          path: `dc/mc/${selectedMc._id}/update`,
          body: payload,
        }).unwrap();
        toast.success("MC updated successfully!");
      } else {
        await createMc({
          path: "dc/create-mc", 
          body: payload,
        }).unwrap();
        toast.success("MC created successfully!");
      }

      setIsModalOpen(false);
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || "Operation failed");
    }
  };

  const confirmDelete = async () => {
    if (!mcToDelete?.original?._id) return;

    try {
      await deleteMc({
        path: `dc/mc/${mcToDelete.original._id}/delete`,
      }).unwrap();
      toast.success("MC deleted successfully!");
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete");
    } finally {
      setShowDeleteConfirm(false);
      setMcToDelete(null);
    }
  };

  const mappedMcs = useMemo(() => {
    return (mcsData?.data || []).map(mc => ({
      id: mc._id,
      original: mc,
      Name: mc.name || "—",
      District: mc.zilaId?.name || "—",
      Tehsil: mc.tehsilId?.name || "—",
      Status: mc.isActive !== false ? "Active" : "Inactive",
    }));
  }, [mcsData]);

  return (
    <>
      <Header
        title="Municipal Committees"
        icon={Building2}
        count={mappedMcs.length}
        actionButton={<AddButton text="Create MC" onClick={handleCreate} />}
      />

      {mcsLoading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <Loader />
        </div>
      ) : (
        <Table
          columns={columns}
          data={mappedMcs}
          actions={{ edit: true, delete: true }}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={isEditMode ? "Edit MC" : "Create New MC"}
      >
        <form onSubmit={handleSubmit}>
          <div className="space-y-5">
            <FormInput 
              label="Name" 
              name="name" 
              value={formData.name} 
              onChange={handleInputChange} 
              required 
            />

            <FormInput
              label="District"
              type="select"
              name="zilaId"
              value={formData.zilaId}
              onChange={handleInputChange}
              options={districtOptions}
              placeholder="Select District"
              required
            />

            <FormInput
              label="Tehsil"
              type="select"
              name="tehsilId"
              value={formData.tehsilId}
              onChange={handleInputChange}
              options={tehsilOptions}
              placeholder={formData.zilaId ? "Select Tehsil" : "Select District first"}
              disabled={!formData.zilaId}
              required
            />

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2 rounded-lg font-semibold bg-gray-500 hover:bg-gray-600 text-white"
                disabled={isCreating || isUpdating}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isCreating || isUpdating}
                className="px-6 py-2 rounded-lg font-semibold bg-greenDarkest hover:bg-green-700 text-white disabled:opacity-50"
              >
                {isCreating || isUpdating
                  ? isEditMode ? "Updating..." : "Creating..."
                  : isEditMode ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={confirmDelete}
        title="Delete MC"
        message={
          mcToDelete
            ? `Are you sure you want to delete "${mcToDelete.Name}"?`
            : "Are you sure you want to delete this MC?"
        }
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={isDeleting}
        variant="danger"
      />
    </>
  );
};

export default McsList;