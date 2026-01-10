import React, { useMemo, useState } from "react";
import { toast } from "react-toastify";
import {
  useGetQuery,
  usePostMutation,
  usePutMutation,
  useDeleteMutation,
} from "@/services/apiService";
import { Building2, Trash2, User } from "lucide-react"; 

import AddButton from "@/components/common/AddButton";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import Header from "@/components/common/Header";
import Loader from "@/components/common/Loader";
import Modal from "@/components/common/Modal";
import Table from "@/components/common/Table";
import FormInput from "@/components/forms/Formnput";

const columns = ["Name", "Username", "District",  "Phone", "Status"];

const DCOList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedCo, setSelectedCo] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    role: "", 
    zilaId: "",
    tehsilId: "",
    password: "",
    phone: "",
  });

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [coToDelete, setCoToDelete] = useState(null);

  const { data: rolesData } = useGetQuery({ path: "get-roles" });
  const roles = rolesData?.roles || [];

  const { data: districtsData } = useGetQuery({ path: "zila/all" });
  const districts = districtsData?.data || [];

  const { data: tehsilsData } = useGetQuery({ path: "tehsil/all" });
  const tehsils = tehsilsData?.tehsils || [];

const {
  data: mcsData,
  isLoading: mcsLoading,
  refetch,
} = useGetQuery({
  path: "dc/users/by-role",
  params: { roleName: "DISTRICT_COUNCIL_OFFICER" },
});

  const [createCo, { isLoading: isCreating }] = usePostMutation();
  const [updateCo, { isLoading: isUpdating }] = usePutMutation();
  const [deleteCo, { isLoading: isDeleting }] = useDeleteMutation();

  const roleOptions = useMemo(() => 
    roles.map(role => ({
      value: role._id,
      label: role.name
    })), 
  [roles]);

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
    setSelectedCo(null);
    setFormData({
      name: "",
      username: "",
      role: "", 
      zilaId: "",
      tehsilId: "",
      password: "",
      phone: "",
    });
    setIsModalOpen(true);
  };

  const handleEdit = (row) => {
    const original = row.original;

    if (!original) {
      toast.error("Missing original MC user data");
      return;
    }

    setIsEditMode(true);
    setSelectedCo(original);

    setFormData({
      name: original.name || "",
      username: original.username || "",
      role: original.roleId || original.role?.id || "",
      zilaId: original.zilaId?._id || original.zilaId || "",
      tehsilId: original.tehsilId?._id || "",
      password: "",
      phone: original.phone || "",
    });

    setIsModalOpen(true);
  };

  const handleDelete = (row) => {
    setCoToDelete(row);
    setShowDeleteConfirm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) return toast.error("Name is required");
    if (!formData.username.trim()) return toast.error("Username is required");
    if (!formData.role) return toast.error("Please select a role");
    if (!formData.phone.trim()) return toast.error("Phone is required");

    if (!isEditMode && !formData.password.trim()) {
      return toast.error("Password is required for new MC");
    }

    const payload = {
      name: formData.name.trim(),
      username: formData.username.trim(),
      roleId: formData.role,
      zilaId: formData.zilaId || undefined,
      tehsilId: formData.tehsilId || undefined,
      phone: formData.phone.trim(),
      ...(formData.password.trim() && { password: formData.password.trim() }),
    };

    try {
      if (isEditMode) {
        await updateCo({
          path: `dc/mc/${selectedCo._id}/update`,   // ← updated endpoint
          body: payload,
        }).unwrap();
        toast.success("MC user updated successfully!");
      } else {
        await createCo({
          path: "dc/createUser",                          // ← create endpoint
          body: payload,
        }).unwrap();
        toast.success("MC user created successfully!");
      }

      setIsModalOpen(false);
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || "Operation failed");
    }
  };

  const confirmDelete = async () => {
    if (!coToDelete?.original?._id) return;

    try {
      await deleteCo({
        path: `dc/mc/${coToDelete.original._id}/delete`,  // ← delete endpoint
      }).unwrap();
      toast.success("MC user deleted successfully!");
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete");
    } finally {
      setShowDeleteConfirm(false);
      setCoToDelete(null);
    }
  };

  const mappedMcs = useMemo(() => {
    return (mcsData?.data || []).map(mc => ({
      id: mc._id,
      original: mc,
      Name: mc.name || "—",
      Username: mc.username || "—",
      District: mc.zilaId?.name || "—",
      Tehsil: mc.tehsilId?.name || "—",
      Phone: mc.phone || "—",
      Status: mc.isActive !== false ? "Active" : "Inactive",
    }));
  }, [mcsData]);

  return (
    <>
      <Header
        title="Cheif Officer"
        icon={User}
        count={mappedMcs.length}
        actionButton={<AddButton text="Create" onClick={handleCreate} />}
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

      {/* Create / Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={isEditMode ? "Edit CO" : "Create CO"}
      >
        <form onSubmit={handleSubmit}>
          <div className="space-y-5">
            <FormInput label="Full Name" name="name" value={formData.name} onChange={handleInputChange} required />
            <FormInput label="Username" name="username" value={formData.username} onChange={handleInputChange} required />
            
            <FormInput
              label="Role"
              type="select"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              options={roleOptions}
              placeholder="Select Role"
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
            />

            <FormInput
              label={isEditMode ? "New Password (optional)" : "Password"}
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              required={!isEditMode}
              placeholder={isEditMode ? "Leave empty to keep current" : "Enter password"}
            />

            <FormInput label="Phone" name="phone" value={formData.phone} onChange={handleInputChange} required />

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
                  : isEditMode ? "Update CO" : "Create CO"}
              </button>
            </div>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={confirmDelete}
        title="Delete CO"
        message={
          coToDelete
            ? `Are you sure you want to delete "${coToDelete.Name}"?`
            : "Are you sure you want to delete this CO?"
        }
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={isDeleting}
        variant="danger"
      />
    </>
  );
};

export default DCOList;