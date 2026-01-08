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
import { User, UserPlus } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";

const UserList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    roleId: "",
    tehsilId: "",
    isActive: true,
  });

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  // Fetch users
  const {
    data: usersData,
    isLoading: usersLoading,
    refetch,
  } = useGetQuery({ path: "/dc/users" });

  // Mutations
  const [createUser, { isLoading: isCreating }] = usePostMutation();
  const [updateUser, { isLoading: isUpdating }] = usePatchMutation();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteMutation();

  const users = usersData?.data || [];

  // You should ideally fetch roles and tehsils for dropdowns
  // For now we'll use simple text inputs - in real app replace with selects
  // const { data: roles } = useGetQuery({ path: "/roles" });
  // const { data: tehsils } = useGetQuery({ path: "/tehsil/all" });

  const handleCreate = () => {
    setIsEditMode(false);
    setSelectedUser(null);
    setFormData({
      name: "",
      username: "",
      password: "",
      roleId: "",
      tehsilId: "",
      isActive: true,
    });
    setIsModalOpen(true);
  };

  const handleEdit = (row) => {
    setIsEditMode(true);
    setSelectedUser(row);
    setFormData({
      name: row.name || "",
      username: row.username || "",
      password: "", // We usually don't prefill password
      roleId: row.roleId || "",
      tehsilId: row.tehsilId || "",
      isActive: row.isActive ?? true,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (row) => {
    setUserToDelete(row);
    setShowDeleteConfirm(true);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Name is required");
      return;
    }
    if (!formData.username.trim()) {
      toast.error("Username is required");
      return;
    }

    // For create - password is required
    if (!isEditMode && !formData.password.trim()) {
      toast.error("Password is required for new user");
      return;
    }

    const payload = {
      name: formData.name.trim(),
      username: formData.username.trim(),
      ...(formData.password.trim() && { password: formData.password.trim() }), // only send if filled
      roleId: formData.roleId,
      tehsilId: formData.tehsilId,
      isActive: formData.isActive,
    };

    try {
      if (isEditMode) {
        await updateUser({
          path: `/dc/users/${selectedUser._id}`,
          body: payload,
        }).unwrap();
        toast.success("User updated successfully!");
      } else {
        await createUser({
          path: "/dc/users",
          body: payload,
        }).unwrap();
        toast.success("User created successfully!");
      }

      setIsModalOpen(false);
      setIsEditMode(false);
      setSelectedUser(null);
      refetch();
    } catch (error) {
      const errorMessage =
        error?.data?.error ||
        error?.data?.message ||
        "Failed to save user. Please try again.";
      toast.error(errorMessage);
    }
  };

  const confirmDelete = async () => {
    if (!userToDelete) return;

    try {
      await deleteUser({
        path: `/dc/users/${userToDelete.id}`,
      }).unwrap();

      toast.success("User deleted successfully!");
      refetch();
    } catch (error) {
      const errorMsg =
        error?.data?.error ||
        error?.data?.message ||
        "Failed to delete user";
      toast.error(errorMsg);
    } finally {
      setShowDeleteConfirm(false);
      setUserToDelete(null);
    }
  };

  // Table data mapping
  const mappedUsers = useMemo(() => {
    return users.map((user) => ({
      id: user._id,
      Name: user.name || "—",
      Username: user.username || "—",
      Role: user.role?.name || "—", // In real app you would map role name
      Tehsil: user.tehsilId?.name || "—",
      Status: user.isActive ? "Active" : "Inactive",
    }));
  }, [users]);

  const columns = ["Name", "Username", "Role", "Tehsil", "Status"];

  return (
    <>
      <Header
        title="Users Management"
        icon={User}
        count={users.length}
        actionButton={<AddButton text="Create User" onClick={handleCreate} />}
      />

      {usersLoading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <Loader />
        </div>
      ) : (
        <Table
          columns={columns}
          data={mappedUsers}
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
          setSelectedUser(null);
        }}
        title={isEditMode ? "Edit User" : "Create New User"}
      >
        <form onSubmit={handleSubmit}>
          <div className="space-y-5">
            <FormInput
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter full name"
              required
            />

            <FormInput
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Enter username"
              required
            />

            <FormInput
              label={isEditMode ? "New Password (optional)" : "Password"}
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder={isEditMode ? "Leave blank to keep current" : "Enter password"}
              required={!isEditMode}
            />

            {/* Replace these with proper Select components in production */}
            <FormInput
              label="Role ID"
              name="roleId"
              value={formData.roleId}
              onChange={handleInputChange}
              placeholder="Enter role ID"
            />

            <FormInput
              label="Tehsil ID"
              name="tehsilId"
              value={formData.tehsilId}
              onChange={handleInputChange}
              placeholder="Enter tehsil ID"
            />

            <div className="flex items-center">
              <input
                type="checkbox"
                id="isActive"
                name="isActive"
                checked={formData.isActive}
                onChange={handleInputChange}
                className="mr-2"
              />
              <label htmlFor="isActive">Active User</label>
            </div>

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
                  ? isEditMode
                    ? "Updating..."
                    : "Creating..."
                  : isEditMode
                  ? "Update User"
                  : "Create User"}
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
          setUserToDelete(null);
        }}
        onConfirm={confirmDelete}
        title="Delete User"
        message={
          userToDelete
            ? `Are you sure you want to delete user "${userToDelete.name}"?`
            : "Are you sure you want to delete this user?"
        }
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={isDeleting}
        variant="danger"
      />
    </>
  );
};

export default UserList;