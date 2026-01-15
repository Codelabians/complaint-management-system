import React, { useMemo, useState } from "react";
import { toast } from "react-toastify";
import {
  useGetQuery,
  usePostMutation,
  usePatchMutation,
  useDeleteMutation,
} from "@/services/apiService";
import { ShieldCheck, Trash2 } from "lucide-react";

import AddButton from "@/components/common/AddButton";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import Header from "@/components/common/Header";
import Loader from "@/components/common/Loader";
import Modal from "@/components/common/Modal";
import Table from "@/components/common/Table";
import FormInput from "@/components/forms/Formnput";

const columns = ["Role Name"];

const Roles = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
  });

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState(null);

  // API Hooks
  const {
    data: rolesData,
    isLoading: rolesLoading,
    refetch,
  } = useGetQuery({ path: "get-roles" });

  const [createRole, { isLoading: isCreating }] = usePostMutation();
  const [updateRole, { isLoading: isUpdating }] = usePatchMutation();
  const [deleteRole, { isLoading: isDeleting }] = useDeleteMutation();

  const roles = rolesData?.data || rolesData?.roles || []; 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = () => {
    setIsEditMode(false);
    setSelectedRole(null);
    setFormData({ name: "" });
    setIsModalOpen(true);
  };

  const handleEdit = (row) => {
    setIsEditMode(true);
    setSelectedRole(row);
    setFormData({
      name: row["Role Name"] || ""
    });
    setIsModalOpen(true);
  };

  const handleDelete = (row) => {
    setRoleToDelete(row);
    setShowDeleteConfirm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Role name is required");
      return;
    }

    const payload = {
      name: formData.name.trim(),
    };

    try {
      if (isEditMode) {
        // UPDATE
        await updateRole({
          path: `update-roles/${selectedRole.id}`,
          body: payload,
        }).unwrap();

        toast.success("Role updated successfully!");
      } else {
        // CREATE
        await createRole({
          path: "create-roles",
          body: payload,
        }).unwrap();

        toast.success("Role created successfully!");
      }

      setIsModalOpen(false);
      setIsEditMode(false);
      setSelectedRole(null);
      setFormData({ name: "" });
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || "Operation failed");
    }
  };

  const confirmDelete = async () => {
    if (!roleToDelete) return;

    try {
      await deleteRole({
        path: `delete-roles/${roleToDelete.id}`,
      }).unwrap();

      toast.success("Role deleted successfully!");
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete role");
    } finally {
      setShowDeleteConfirm(false);
      setRoleToDelete(null);
    }
  };

  const mappedRoles = useMemo(() => {
    return roles.map((role) => ({
      id: role._id,
      "Role Name": role.name || "—",
    }));
  }, [roles]);

  return (
    <>
      <Header
        title="Roles"
        icon={ShieldCheck}
        count={roles.length}
        // actionButton={<AddButton text="Create Role" onClick={handleCreate} />}
      />

      {rolesLoading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <Loader />
        </div>
      ) : (
        <Table
          columns={columns}
          data={mappedRoles}
          actions={{
            edit: true,
            delete: true,
          }}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {/* Create/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setIsEditMode(false);
          setSelectedRole(null);
        }}
        title={isEditMode ? "Edit Role" : "Create New Role"}
      >
        <form onSubmit={handleSubmit}>
          <div className="space-y-5">
            <FormInput
              label="Role Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter role name (e.g. Admin, Editor, Viewer)"
              required
            />

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={() => {
                  setIsModalOpen(false);
                  setIsEditMode(false);
                  setSelectedRole(null);
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
                  ? "Update Role"
                  : "Create Role"}
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
          setRoleToDelete(null);
        }}
        onConfirm={confirmDelete}
        title="Delete Role"
        message={
          roleToDelete
            ? `Are you sure you want to delete role "${roleToDelete.name}"? This action cannot be undone.`
            : "Are you sure you want to delete this role?"
        }
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={isDeleting}
        variant="danger"
      />
    </>
  );
};

export default Roles;