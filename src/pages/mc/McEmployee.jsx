import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import {
  useGetQuery,
  usePostMutation,
  usePutMutation,
  useDeleteMutation,
} from "@/services/apiService";
import { Users2Icon } from "lucide-react";

import AddButton from "@/components/common/AddButton";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import Filters from "@/components/common/Filters";
import Header from "@/components/common/Header";
import Loader from "@/components/common/Loader";
import Modal from "@/components/common/Modal";
import Table from "@/components/common/Table";
import FormInput from "@/components/forms/Formnput";

const columns = [
  "Name",
  "Username",
  "District",
  "Tehsil",
  "Municipal Committee",
  "Phone",
  "Status",
];

const McEmployee = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedMc, setSelectedMc] = useState(null);

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const [filterValues, setFilterValues] = useState({
    search: "",
    isActive: "",
    zilaId: "",
    tehsilId: "",
    mcId: "",
  });

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    role: "",
    zilaId: "",
    tehsilId: "",
    mcId: "",
    password: "",
    phone: "",
  });

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [mcToDelete, setMcToDelete] = useState(null);

  const { data: rolesData } = useGetQuery({ path: "get-roles" });
  const roles = rolesData?.roles || [];

  const { data: districtsData } = useGetQuery({ path: "zila/all" });
  const districts = districtsData?.data || [];

  const { data: tehsilsData, isLoading: tehsilsLoading } = useGetQuery({
    path: "tehsil/all",
  });
  const tehsils = tehsilsData?.tehsils || [];

  const { data: mcData } = useGetQuery({ path: "dc/all/mcs" });
  const municipalities = mcData?.data || [];

  const queryParams = useMemo(() => {
    const params = new URLSearchParams();

    if (filterValues.search) params.append("search", filterValues.search);
    if (filterValues.isActive) params.append("isActive", filterValues.isActive);
    if (filterValues.zilaId) params.append("zilaId", filterValues.zilaId);
    if (filterValues.tehsilId) params.append("tehsilId", filterValues.tehsilId);
    if (filterValues.mcId) params.append("mcId", filterValues.mcId);

    params.append("page", page);
    params.append("per_page", perPage);

    return params.toString();
  }, [filterValues, page, perPage]);

  useEffect(() => {
    setPage(1);
  }, [filterValues]);

  const {
    data: mcsData,
    isLoading: mcsLoading,
    refetch,
  } = useGetQuery({
    path: `dc/users/by-role?roleName=MC_EMPLOYEE&${queryParams}`,
  });

  const [createMc, { isLoading: isCreating }] = usePostMutation();
  const [updateMc, { isLoading: isUpdating }] = usePutMutation();
  const [deleteMc, { isLoading: isDeleting }] = useDeleteMutation();

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

  const filterMcOptions = useMemo(() => {
    if (!filterValues.tehsilId) return [];
    return municipalities
      .filter((mc) => mc.tehsilId?._id === filterValues.tehsilId)
      .map((mc) => ({ value: mc._id, label: mc.name || "Unnamed MC" }));
  }, [municipalities, filterValues.tehsilId]);

  const modalTehsilOptions = useMemo(() => {
    if (!formData.zilaId) return [];
    return tehsils
      .filter((t) => t.zilaId?._id === formData.zilaId)
      .map((t) => ({ value: t._id, label: t.name }));
  }, [tehsils, formData.zilaId]);

  const modalMcOptions = useMemo(() => {
    if (!formData.tehsilId) return [];
    return municipalities
      .filter((mc) => mc.tehsilId?._id === formData.tehsilId)
      .map((mc) => ({ value: mc._id, label: mc.name || "Unnamed MC" }));
  }, [municipalities, formData.tehsilId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newData = { ...prev, [name]: value };
      if (name === "zilaId") {
        newData.tehsilId = "";
        newData.mcId = "";
      }
      if (name === "tehsilId") {
        newData.mcId = "";
      }
      return newData;
    });
  };

  const handleCreate = () => {
    setIsEditMode(false);
    setSelectedMc(null);
    setFormData({
      name: "",
      username: "",
      role: "",
      zilaId: "",
      tehsilId: "",
      mcId: "",
      password: "",
      phone: "",
    });
    setIsModalOpen(true);
  };

  const handleEdit = (row) => {
    const original = row.original;
    if (!original) return toast.error("Missing MC employee data");

    setIsEditMode(true);
    setSelectedMc(original);

    setFormData({
      name: original.name || "",
      username: original.username || "",
      role: original.roleId || original.role?._id || "",
      zilaId: original.zilaId?._id || "",
      tehsilId: original.tehsilId?._id || "",
      mcId: original.mcId?._id || "",
      password: "",
      phone: original.phone || "",
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
    if (!formData.username.trim()) return toast.error("Username is required");
    if (!formData.role) return toast.error("Role is required");
    if (!formData.phone.trim()) return toast.error("Phone is required");

    if (!isEditMode && !formData.password.trim()) {
      return toast.error("Password is required for new employee");
    }

    const payload = {
      name: formData.name.trim(),
      username: formData.username.trim(),
      roleId: formData.role,
      zilaId: formData.zilaId || undefined,
      tehsilId: formData.tehsilId || undefined,
      mcId: formData.mcId || undefined,
      phone: formData.phone.trim(),
      ...(formData.password.trim() && { password: formData.password.trim() }),
    };

    try {
      if (isEditMode) {
        await updateMc({
          path: `dc/mc/${selectedMc._id}/update`,
          body: payload,
        }).unwrap();
        toast.success("MC employee updated successfully!");
      } else {
        await createMc({
          path: "dc/createUser",
          body: payload,
        }).unwrap();
        toast.success("MC employee created successfully!");
      }

      setIsModalOpen(false);
      setPage(1);
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
      toast.success("MC employee deleted successfully!");
      setPage(1);
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete");
    } finally {
      setShowDeleteConfirm(false);
      setMcToDelete(null);
    }
  };

  const mappedMcs = useMemo(() => {
    return (mcsData?.data || []).map((mc) => ({
      id: mc._id,
      original: mc,
      Name: mc.name || "—",
      Username: mc.username || "—",
      District: mc.zilaId?.name || "—",
      Tehsil: mc.tehsilId?.name || "—",
      "Municipal Committee": mc.mcId?.name || "—",
      Phone: mc.phone || "—",
      Status: mc.isActive !== false ? "Active" : "Inactive",
    }));
  }, [mcsData]);

  const mcEmployeeFilters = [
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
    {
      key: "mcId",
      type: "select",
      label: "Municipal Committee",
      allLabel: "All MCs",
      options: filterMcOptions,
      disabled: !filterValues.tehsilId,
    },
  ];

  return (
    <>
      <Header
        title="Municipal Committee Employees"
        icon={Users2Icon}
        count={mcsData?.pagination?.totalItems || mappedMcs.length}
        actionButton={<AddButton text="Create MC Employee" onClick={handleCreate} />}
      />

      <Filters
        filters={mcEmployeeFilters}
        values={filterValues}
        onChange={setFilterValues}
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
          setPage={setPage}
          setPerPage={setPerPage}
          paginationMeta={mcsData?.pagination}
        />
      )}

      {/* Create / Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={isEditMode ? "Edit MC Employee" : "Create New MC Employee"}
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
              label="Municipal Committee"
              type="select"
              name="mcId"
              value={formData.mcId}
              onChange={handleInputChange}
              options={modalMcOptions}
              placeholder={
                formData.tehsilId
                  ? "Select Municipal Committee"
                  : "Select Tehsil first"
              }
              disabled={!formData.tehsilId}
              required
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
                  ? "Update Employee"
                  : "Create Employee"}
              </button>
            </div>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={confirmDelete}
        title="Delete MC Employee"
        message={
          mcToDelete
            ? `Are you sure you want to delete "${mcToDelete.Name}"?`
            : "Are you sure you want to delete this MC employee?"
        }
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={isDeleting}
        variant="danger"
      />
    </>
  );
};

export default McEmployee;