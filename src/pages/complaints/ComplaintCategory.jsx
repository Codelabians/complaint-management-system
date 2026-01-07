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
import { ListTodo } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";

const sampleCategories = [
  {
    id: "1",
    Name: "Water Supply",
  },
  {
    id: "2",
    Name: "Electricity",
  },
  {
    id: "3",
    Name: "Sanitation & Sewerage",
  },
  {
    id: "4",
    Name: "Road & Infrastructure",
  },
  {
    id: "5",
    Name: "Garbage Collection",
  },
  {
    id: "6",
    Name: "Street Lights",
  },
  {
    id: "7",
    Name: "Illegal Construction",
  },
  {
    id: "8",
    Name: "Noise Pollution",
  },
  {
    id: "9",
    Name: "Drainage Issue",
  },
  {
    id: "10",
    Name: "Other / Miscellaneous",
  },
];


const ComplaintCategory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
  });

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const {
    data: categoriesData,
    isLoading: categoriesLoading,
    refetch,
  } = useGetQuery({
    path: "/dc/complaint-categories", // ← adjust path according to your API
  });

  const [createCategory, { isLoading: isCreating }] = usePostMutation();
  const [updateCategory, { isLoading: isUpdating }] = usePatchMutation();
  const [deleteCategory, { isLoading: isDeleting }] = useDeleteMutation();

  const categories = categoriesData?.data || []; // adjust based on your API response structure

  const handleCreate = () => {
    setIsEditMode(false);
    setSelectedCategory(null);
    setFormData({ name: "" });
    setIsModalOpen(true);
  };

  const handleEdit = (row) => {
    setIsEditMode(true);
    setSelectedCategory(row);
    setFormData({
      name: row.name || "",
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
    };

    try {
      if (isEditMode) {
        // UPDATE
        await updateCategory({
          path: `/dc/complaint-categories/${selectedCategory.id}`,
          body: payload,
        }).unwrap();

        toast.success("Category updated successfully!");
      } else {
        // CREATE
        await createCategory({
          path: "/dc/complaint-categories",
          body: payload,
        }).unwrap();

        toast.success("Category created successfully!");
      }

      setIsModalOpen(false);
      setIsEditMode(false);
      setSelectedCategory(null);
      setFormData({ name: "" });

      refetch();
    } catch (error) {
      toast.error(error?.data?.message || "Operation failed");
    }
  };

  const confirmDelete = async () => {
    if (!categoryToDelete) return;

    try {
      await deleteCategory({
        path: `/dc/complaint-categories/${categoryToDelete.id}`,
      }).unwrap();

      toast.success("Category deleted successfully!");
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete category");
    } finally {
      setShowDeleteConfirm(false);
      setCategoryToDelete(null);
    }
  };

  // Map data for table display
  const mappedCategories = useMemo(() => {
    return categories.map((cat) => ({
      id: cat._id,
      Name: cat.name || "—",
      // You can add more fields later (description, createdAt, etc.)
    }));
  }, [categories]);

  const columns = ["Name"];

  return (
    <>
      <Header
        title="Complaint Categories"
        icon={ListTodo}
        count={categories.length}
        actionButton={<AddButton text="Add Category" onClick={handleCreate} />}
      />

      {categoriesLoading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <Loader />
        </div>
      ) : (
        <Table
          columns={columns}
          data={mappedCategories}
          actions={{
            edit: true,
            delete: true,
          }}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {/* Create / Edit Modal */}
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

      {/* Delete Confirmation */}
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
            ? `Are you sure you want to delete category "${categoryToDelete.Name}"? This action cannot be undone.`
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