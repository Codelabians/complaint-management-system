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
import { Building2, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";

const columns = ["Tehsil", "District"];

const TehsilList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedTehsil, setSelectedTehsil] = useState(null);
  const [formData, setFormData] = useState({
    district: "",
    name: "",
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [tehsilToDelete, setTehsilToDelete] = useState(null);
    const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const queryParams = useMemo(() => {
  const params = new URLSearchParams();
  params.append("page", page);
  params.append("per_page", perPage);  
  return params.toString();
}, [page, perPage]);

  const { data, isLoading: districtsLoading } = useGetQuery({
    path: "zila/all",
  });
  const {
    data: tehsilsData,
    isLoading: tehsilLoading,
    refetch,
  } = useGetQuery({ path: `tehsil/all${queryParams ? `?${queryParams}` : ""}` });

  const [createTehsil, { isLoading: isCreating }] = usePostMutation();
  const [updateTehsil, { isLoading: isUpdating }] = usePatchMutation();
  const [deleteTehsil, { isLoading: isDeleting }] = useDeleteMutation();

  const districts = data?.data || [];
  const tehsils = tehsilsData?.tehsils || [];

  const districtOptions = useMemo(() => {
    return districts.map((item) => ({
      value: item._id,
      label: item.name,
    }));
  }, [districts]);

  const autoSelectedDistrict = districts.length === 1 ? districts[0]._id : "";

  useMemo(() => {
    if (!isEditMode && autoSelectedDistrict && !formData.district) {
      setFormData((prev) => ({ ...prev, district: autoSelectedDistrict }));
    }
  }, [autoSelectedDistrict, isEditMode]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = () => {
    setIsEditMode(false);
    setSelectedTehsil(null);
    setFormData({ district: autoSelectedDistrict, name: "" });
    setIsModalOpen(true);
  };

  const handleEdit = (row) => {
    setIsEditMode(true);
    setSelectedTehsil(row);
    setFormData({
      district: row.zilaId || "",
      name: row.Tehsil || "",
    });
    setIsModalOpen(true);
  };

  const handleDelete = (row) => {
    setTehsilToDelete(row);
    setShowDeleteConfirm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.district) {
      toast.error("Please select a district");
      return;
    }
    if (!formData.name.trim()) {
      toast.error("Tehsil name is required");
      return;
    }

    const payload = {
      zilaId: formData.district,
      name: formData.name.trim(),
    };

    try {
      if (isEditMode) {
        // UPDATE
        await updateTehsil({
          path: `tehsil/${selectedTehsil.id}`,
          body: payload,
        }).unwrap();

        toast.success("Tehsil updated successfully!");
      } else {
        await createTehsil({
          path: "tehsil/create",
          body: payload,
        }).unwrap();

        toast.success("Tehsil created successfully!");
      }

      setIsModalOpen(false);
      setIsEditMode(false);
      setSelectedTehsil(null);
      setFormData({ district: autoSelectedDistrict, name: "" });

      refetch();
    } catch (error) {
      toast.error(error?.data?.message || "Operation failed");
    }
  };

  const confirmDelete = async () => {
    if (!tehsilToDelete) return;

    try {
      await deleteTehsil({
        path: `tehsil/${tehsilToDelete.id}`,
      }).unwrap();

      toast.success("Tehsil deleted successfully!");
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete tehsil");
    } finally {
      setShowDeleteConfirm(false);
      setTehsilToDelete(null);
    }
  };

  const mappedTehsils = useMemo(() => {
    return tehsils.map((tehsil) => ({
      id: tehsil._id,
      Tehsil: tehsil.name || "—",
      District: tehsil.zilaId?.name || "Not Assigned",
      zilaId: tehsil.zilaId?._id || null,
    }));
  }, [tehsils]);

  return (
    <>
      <Header
        title="Tehsils"
        icon={Building2}
        count={tehsils.length}
        actionButton={<AddButton text="Create" onClick={handleCreate} />}
      />

      {tehsilLoading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <Loader />
        </div>
      ) : (
        <Table
          columns={columns}
          data={mappedTehsils}
          actions={{
            edit: true,
            delete: true,
          }}
          onEdit={handleEdit}
          onDelete={handleDelete}
             setPage={setPage}
          setPerPage={setPerPage}
          paginationMeta={tehsilsData?.pagination}
        />
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setIsEditMode(false);
          setSelectedTehsil(null);
        }}
        title={isEditMode ? "Edit Tehsil" : "Create Tehsil"}
      >
        <form onSubmit={handleSubmit}>
          <div className="space-y-5">
            <FormInput
              label="District"
              type="select"
              name="district"
              value={formData.district}
              onChange={handleInputChange}
              options={districtOptions}
              placeholder={districtsLoading ? "Loading..." : "Select district"}
              disabled={districtsLoading || districts.length === 0}
              required
            />

            <FormInput
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter Tehsil Name"
              required
            />

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={() => {
                  setIsModalOpen(false);
                  setIsEditMode(false);
                  setSelectedTehsil(null);
                }}
                className="px-6 py-2 rounded-lg font-semibold bg-gray-500 hover:bg-gray-600 text-white transition-all"
                disabled={isCreating || isUpdating}
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isCreating || isUpdating || districtsLoading}
                className="px-6 py-2 rounded-lg font-semibold bg-greenDarkest hover:bg-green-700 text-white transition-all disabled:opacity-50"
              >
                {isCreating || isUpdating
                  ? isEditMode
                    ? "Updating..."
                    : "Creating..."
                  : isEditMode
                    ? "Update Tehsil"
                    : "Add Tehsil"}
              </button>
            </div>
          </div>
        </form>
      </Modal>
      <ConfirmDialog
        isOpen={showDeleteConfirm}
        onClose={() => {
          setShowDeleteConfirm(false);
          setTehsilToDelete(null);
        }}
        onConfirm={confirmDelete}
        title="Delete Tehsil"
        message={
          tehsilToDelete
            ? `Are you sure you want to delete "${tehsilToDelete.Tehsil}"? This action cannot be undone.`
            : "Are you sure you want to delete this tehsil?"
        }
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={isDeleting}
        variant="danger"
      />
    </>
  );
};

export default TehsilList;
