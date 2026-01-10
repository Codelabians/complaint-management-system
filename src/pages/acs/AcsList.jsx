import React, { useMemo, useState } from "react";
import { toast } from "react-toastify";
import {
  useGetQuery,
  usePostMutation,
  usePatchMutation,
  useDeleteMutation,
  usePutMutation,
} from "@/services/apiService";
import { UserCog, Trash2 } from "lucide-react";

import AddButton from "@/components/common/AddButton";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import Header from "@/components/common/Header";
import Loader from "@/components/common/Loader";
import Modal from "@/components/common/Modal";
import Table from "@/components/common/Table";
import FormInput from "@/components/forms/Formnput";

const columns = ["Name", "Username", "District", "Tehsil", "Phone", "Status"];

const AcsList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedAc, setSelectedAc] = useState(null);
  
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
  const [acToDelete, setAcToDelete] = useState(null);

  const { data: rolesData } = useGetQuery({ path: "get-roles" });
  const roles = rolesData?.roles || [];

  const { data: districtsData } = useGetQuery({ path: "zila/all" });
  const districts = districtsData?.data || [];

  const { data: tehsilsData } = useGetQuery({ path: "tehsil/all" });
  const tehsils = tehsilsData?.tehsils || [];

const {
  data: acsData,
  isLoading: acsLoading,
  refetch,
} = useGetQuery({
  path: "dc/users/by-role",
  params: { roleName: "AC" },
});

  const [createAc, { isLoading: isCreating }] = usePostMutation();
  const [updateAc, { isLoading: isUpdating }] = usePutMutation();
  const [deleteAc, { isLoading: isDeleting }] = useDeleteMutation();

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
    setSelectedAc(null);
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
    toast.error("Missing original user data");
    return;
  }

  setIsEditMode(true);
  setSelectedAc(original);
  console.log(original);
  

  setFormData({
    id : original.id,
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
    setAcToDelete(row);
    setShowDeleteConfirm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) return toast.error("Name is required");
    if (!formData.username.trim()) return toast.error("Username is required");
    if (!formData.role) return toast.error("Please select a role");
    if (!formData.phone.trim()) return toast.error("Phone is required");

    if (!isEditMode && !formData.password.trim()) {
      return toast.error("Password is required for new AC");
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
        await updateAc({
          path: `dc/users/${selectedAc._id}/update`,
          body: payload,
        }).unwrap();
        toast.success("AC updated successfully!");
      } else {
        await createAc({
          path: "dc/createUser", 
          body: payload,
        }).unwrap();
        toast.success("AC created successfully!");
      }

      setIsModalOpen(false);
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || "Operation failed");
    }
  };

  const confirmDelete = async () => {
    if (!acToDelete) return;
    console.log("delete id" , acToDelete);
    
    try {
      await deleteAc({
        path: `dc/users/${acToDelete.original._id}/delete`, 
      }).unwrap();
      toast.success("AC deleted successfully!");
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete");
    } finally {
      setShowDeleteConfirm(false);
      setAcToDelete(null);
    }
  };
const mappedAcs = useMemo(() => {
  return (acsData?.data || []).map(ac => ({
    id: ac.id,
    original: ac,                     
    Name: ac.name || "—",
    Username: ac.username || "—",
    Role: ac.role?.name || "—",
    District: ac.zilaId?.name || "—",
    Tehsil: ac.tehsilId?.name || "—",
    Phone: ac.phone || "—",
    Status: ac.isActive !== false ? "Active" : "Inactive",
  }));
}, [acsData]);

  return (
    <>
      <Header
        title="ACs"
        icon={UserCog}
        count={mappedAcs.length}
        actionButton={<AddButton text="Create AC" onClick={handleCreate} />}
      />

      {acsLoading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <Loader />
        </div>
      ) : (
        <Table
          columns={columns}
          data={mappedAcs}
          actions={{ edit: true, delete: true }}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {/* Create / Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={isEditMode ? "Edit AC" : "Create New AC"}
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
              placeholder="Select District "
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
            />

            <FormInput
              label={isEditMode ? "New Password " : "Password"}
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              required={!isEditMode}
              placeholder={isEditMode ? "Enter new password (optional)" : "Enter password"}
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
                  : isEditMode ? "Update AC" : "Create AC"}
              </button>
            </div>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={confirmDelete}
        title="Delete AC"
        message={
          acToDelete
            ? `Are you sure you want to delete "${acToDelete.Name}"?`
            : "Are you sure you want to delete this AC?"
        }
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={isDeleting}
        variant="danger"
      />
    </>
  );
};

export default AcsList;