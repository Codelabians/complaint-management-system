import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import {
  useGetQuery,
  usePostMutation,
  usePutMutation,
  useDeleteMutation,
} from "@/services/apiService";
import { UserCog } from "lucide-react";

import AddButton from "@/components/common/AddButton";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import Filters from "@/components/common/Filters";
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

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const [filterValues, setFilterValues] = useState({
    search: "",
    isActive: "",
    zilaId: "",
    tehsilId: "",
  });

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

  const { data: tehsilsData, isLoading: tehsilsLoading } = useGetQuery({
    path: "tehsil/all",
  });
  const tehsils = tehsilsData?.tehsils || [];

  const queryParams = useMemo(() => {
    const params = new URLSearchParams();

    if (filterValues.search) params.append("search", filterValues.search);
    if (filterValues.isActive) params.append("isActive", filterValues.isActive);
    if (filterValues.zilaId) params.append("zilaId", filterValues.zilaId);
    if (filterValues.tehsilId) params.append("tehsilId", filterValues.tehsilId);

    params.append("page", page);
    params.append("per_page", perPage);

    return params.toString();
  }, [filterValues, page, perPage]);

  useEffect(() => {
    setPage(1);
  }, [filterValues]);

  const {
    data: acsData,
    isLoading: acsLoading,
    refetch,
  } = useGetQuery({
    path: `dc/users/by-role?roleName=AC&${queryParams}`,
  });

  const [createAc, { isLoading: isCreating }] = usePostMutation();
  const [updateAc, { isLoading: isUpdating }] = usePutMutation();
  const [deleteAc, { isLoading: isDeleting }] = useDeleteMutation();

  const roleOptions = useMemo(
    () => roles.map((role) => ({ value: role._id, label: role.name })),
    [roles]
  );

  const districtOptions = useMemo(
    () => districts.map((zila) => ({ value: zila._id, label: zila.name })),
    [districts]
  );

  const filterTehsilOptions = useMemo(() => {
    if (!filterValues.zilaId) return [];
    return tehsils
      .filter((t) => t.zilaId?._id === filterValues.zilaId)
      .map((t) => ({ value: t._id, label: t.name }));
  }, [tehsils, filterValues.zilaId]);

  const modalTehsilOptions = useMemo(() => {
    if (!formData.zilaId) return [];
    return tehsils
      .filter((t) => t.zilaId?._id === formData.zilaId)
      .map((t) => ({ value: t._id, label: t.name }));
  }, [tehsils, formData.zilaId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
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
      return toast.error("Missing user data");
    }

    setIsEditMode(true);
    setSelectedAc(original);

    setFormData({
      name: original.name || "",
      username: original.username || "",
      role: original.roleId || original.role?._id || "",
      zilaId: original.zilaId?._id || "",
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
      setPage(1); 
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || "Operation failed");
    }
  };

  const confirmDelete = async () => {
    if (!acToDelete?.original?._id) return;

    try {
      await deleteAc({
        path: `dc/users/${acToDelete.original._id}/delete`,
      }).unwrap();
      toast.success("AC deleted successfully!");
      setPage(1); 
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete");
    } finally {
      setShowDeleteConfirm(false);
      setAcToDelete(null);
    }
  };

  const mappedAcs = useMemo(() => {
    return (acsData?.data || []).map((ac) => ({
      id: ac._id,
      original: ac,
      Name: ac.name || "—",
      Username: ac.username || "—",
      District: ac.zilaId?.name || "—",
      Tehsil: ac.tehsilId?.name || "—",
      Phone: ac.phone || "—",
      Status: ac.isActive !== false ? "Active" : "Inactive",
    }));
  }, [acsData]);

  const acFilters = [
    {
      key: "search",
      type: "text",
      label: "Search",
      placeholder: "Name, username, phone...",
    },
    {
      key: "isActive",
      type: "select",
      label: "Status",
      allLabel: "All Status",
      options: [
        { value: "true", label: "Active" },
        { value: "false", label: "Inactive" },
      ],
    },
    {
      key: "zilaId",
      type: "select",
      label: "District",
      allLabel: "All Districts",
      options: districtOptions,
    },
    {
      key: "tehsilId",
      type: "select",
      label: "Tehsil",
      allLabel: "All Tehsils",
      options: filterTehsilOptions,
      disabled: !filterValues.zilaId || tehsilsLoading,
    },
  ];

  return (
    <>
      <Header
        title="ACs"
        icon={UserCog}
        count={acsData?.pagination?.totalItems || mappedAcs.length}
        actionButton={<AddButton text="Create AC" onClick={handleCreate} />}
      />

      <Filters
        filters={acFilters}
        values={filterValues}
        onChange={setFilterValues}
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
          setPage={setPage}
          setPerPage={setPerPage}
          paginationMeta={acsData?.pagination}
        />
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={isEditMode ? "Edit AC" : "Create New AC"}
      >
        <form onSubmit={handleSubmit}>
          <div className="space-y-5">
            <FormInput
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <FormInput
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />

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
              label="Tehsil"
              type="select"
              name="tehsilId"
              value={formData.tehsilId}
              onChange={handleInputChange}
              options={modalTehsilOptions}
              placeholder={
                tehsilsLoading
                  ? "Loading tehsils..."
                  : formData.zilaId
                  ? "Select Tehsil"
                  : "Select District first"
              }
              disabled={!formData.zilaId || tehsilsLoading}
            />

            <FormInput
              label={isEditMode ? "New Password (optional)" : "Password"}
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              required={!isEditMode}
              placeholder={isEditMode ? "Enter new password (optional)" : "Enter password"}
            />

            <FormInput
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
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
                  ? isEditMode
                    ? "Updating..."
                    : "Creating..."
                  : isEditMode
                  ? "Update AC"
                  : "Create AC"}
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