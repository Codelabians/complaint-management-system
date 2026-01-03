import AddButton from "@/components/common/AddButton";
import Header from "@/components/common/Header";
import Modal from "@/components/common/Modal";
import Table from "@/components/common/Table";
import FormInput from "@/components/forms/Formnput";
import Button from "@/ui/Button";
import { Building2 } from "lucide-react";
import { useState } from "react";

const columns = ["Tehsil",  ];

const sampleData = [
  {
    id: 1,
    Tehsil: "John Doe",
    email: "john@example.com",
    role: "Developer",
    img: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  },
  {
    id: 2,
    Tehsil: "Jane Smith",
    email: "jane@example.com",
    role: "Designer",
    img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
  },
  {
    id: 3,
    Tehsil: "Bob Johnson",
    email: "bob@example.com",
    role: "Manager",
    img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob",
  },
  {
    id: 4,
    Tehsil: "Alice Williams",
    email: "alice@example.com",
    role: "Developer",
    img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
  },
  {
    id: 5,
    Tehsil: "Charlie Brown",
    email: "charlie@example.com",
    role: "Tester",
    img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie",
  },
];

const TehsilList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Header
        title="Tehsils"
        icon={Building2}
        count={12}
        actionButton={
          <AddButton text="Create" onClick={() => setIsModalOpen(true)} />
        }
      />
      <Table
        columns={columns}
        data={sampleData}
        actions={{
          view: true,
          edit: true,
          delete: true,
        }}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create tehsil"
      >
        <div>
          <FormInput
            label="Name"
            name="name"
            placeholder="Enter Name"
            required
          />
          {/* <FormInput label="Email Address" type="email" name="email"  placeholder="Enter email address" required /> */}
          {/* <FormInput label="Role" type="select" name="role"   options={[
            { value: 'Developer', label: 'Developer' },
            { value: 'Designer', label: 'Designer' },
            { value: 'Manager', label: 'Manager' },
            { value: 'Tester', label: 'Tester' }
          ]} placeholder="Select role" required /> */}
          {/* <FormInput label="Description" type="textarea" name="description"  placeholder="Enter description" rows={3} /> */}

          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-6 py-2 rounded-lg font-semibold transition-all bg-grey text-white"
            >
              Cancel
            </button>
            <button className="px-6 py-2 rounded-lg font-semibold transition-all bg-greenPrimary text-white">
              Create Employee
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default TehsilList;
