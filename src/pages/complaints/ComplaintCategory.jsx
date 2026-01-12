import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import {
  useGetQuery,
  usePostMutation,
  usePutMutation,
  useDeleteMutation,
  usePatchMutation,
} from "@/services/apiService";
import { ListTodo } from "lucide-react";

import AddButton from "@/components/common/AddButton";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import Header from "@/components/common/Header";
import Loader from "@/components/common/Loader";
import Modal from "@/components/common/Modal";
import Table from "@/components/common/Table";
import ToggleSwitch from "@/components/common/ToggleSwitch";
import FormInput from "@/components/forms/Formnput";

const ComplaintCategory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Pagination states
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const [formData, setFormData] = useState({
    name: "",
    isActive: true,
  });

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  // ── Query Params with Pagination ───────────────────────────────────────
  const queryParams = useMemo(() => {
    const params = new URLSearchParams();
    params.append("page", page);
    params.append("per_page", perPage);
    return params.toString();
  }, [page, perPage]);

  const {
    data: categoriesData,
    isLoading: categoriesLoading,
    refetch,
  } = useGetQuery({
    path: `/complains/get?${queryParams}`,
  });

  const [createCategory, { isLoading: isCreating }] = usePostMutation();
  const [updateCategory, { isLoading: isUpdating }] = usePutMutation();
  const [deleteCategory, { isLoading: isDeleting }] = useDeleteMutation();
  const [updateStatus, { isLoading: isStatusUpdating }] = usePatchMutation();

  const categories = categoriesData?.data || [];

  // Reset page to 1 after create/update/delete (good UX)
  useEffect(() => {
    // Optional: reset when modal closes after success
  }, [isModalOpen]);

  const handleCreate = () => {
    setIsEditMode(false);
    setSelectedCategory(null);
    setFormData({ name: "", isActive: true });
    setIsModalOpen(true);
  };

  const handleEdit = (row) => {
    setIsEditMode(true);
    setSelectedCategory(row);
    setFormData({
      name: row.Name || "",
      isActive: row.isActive ?? true,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (row) => {
    setCategoryToDelete(row);
    setShowDeleteConfirm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Category name is required");
      return;
    }

    const payload = {
      name: formData.name.trim(),
      // isActive is handled separately via toggle, no need to send here
    };

    try {
      if (isEditMode) {
        await updateCategory({
          path: `/complains/update/${selectedCategory.id}`,
          body: payload,
        }).unwrap();
        toast.success("Category updated successfully!");
      } else {
        await createCategory({
          path: "/complains/create",
          body: payload,
        }).unwrap();
        toast.success("Category created successfully!");
      }

      setIsModalOpen(false);
      setIsEditMode(false);
      setSelectedCategory(null);
      setFormData({ name: "", isActive: true });
      setPage(1); // Reset to first page after success
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || "Operation failed");
    }
  };

  const handleStatusToggle = async (categoryId, currentStatus, categoryName) => {
    try {
      await updateStatus({
        path: `/complains/deactivate/${categoryId}`,
        body: {},
      }).unwrap();

      toast.success(
        `Category "${categoryName}" ${currentStatus ? "deactivated" : "activated"} successfully!`
      );
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update status");
    }
  };

  const confirmDelete = async () => {
    if (!categoryToDelete) return;

    try {
      await deleteCategory({
        path: `/complains/delete/${categoryToDelete.id}`,
      }).unwrap();

      toast.success("Category deleted successfully!");
      setPage(1); // Reset to first page
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete category");
    } finally {
      setShowDeleteConfirm(false);
      setCategoryToDelete(null);
    }
  };

  const mappedCategories = useMemo(() => {
    return categories.map((cat) => ({
      id: cat._id,
      Name: cat.name || "—",
      isActive: cat.isActive,
      Status: (
        <ToggleSwitch
          isChecked={cat.isActive}
          onToggle={async (newValue) => {
            await handleStatusToggle(cat._id, cat.isActive, cat.name);
          }}
          dialogTitle={cat.isActive ? "Deactivate Category" : "Activate Category"}
          dialogMessage={`Are you sure you want to ${cat.isActive ? "deactivate" : "activate"} the category "${cat.name}"?`}
          confirmText={cat.isActive ? "Deactivate" : "Activate"}
        />
      ),
    }));
  }, [categories]);

  return (
    <>
      <Header
        title="Complaint Categories"
        icon={ListTodo}
        count={categoriesData?.pagination?.total || categories.length}
        actionButton={<AddButton text="Add Category" onClick={handleCreate} />}
      />

      {categoriesLoading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <Loader />
        </div>
      ) : (
        <Table
          columns={["Name", "Status"]}
          data={mappedCategories}
          actions={{
            edit: true,
            delete: true,
          }}
          onEdit={handleEdit}
          onDelete={handleDelete}
          setPage={setPage}
          setPerPage={setPerPage}
          paginationMeta={categoriesData?.pagination}
        />
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setIsEditMode(false);
          setSelectedCategory(null);
        }}
        title={isEditMode ? "Edit Category" : "Create New Category"}
      >
        <form onSubmit={handleSubmit}>
          <div className="space-y-5">
            <FormInput
              label="Category Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter category name"
              required
            />

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={() => {
                  setIsModalOpen(false);
                  setIsEditMode(false);
                  setSelectedCategory(null);
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
                  ? "Update Category"
                  : "Add Category"}
              </button>
            </div>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={showDeleteConfirm}
        onClose={() => {
          setShowDeleteConfirm(false);
          setCategoryToDelete(null);
        }}
        onConfirm={confirmDelete}
        title="Delete Category"
        message={
          categoryToDelete
            ? `Are you sure you want to delete category "${categoryToDelete.Name}"?`
            : "Are you sure you want to delete this category?"
        }
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={isDeleting}
        variant="danger"
      />
    </>
  );
};

export default ComplaintCategory;