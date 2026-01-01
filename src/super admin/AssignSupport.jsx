import DynamicTable from "@/common/DynamicTable";
import Heading from "@/common/Heading";
import InputField from "@/common/InputField";
import SearchBar from "@/common/SearchInput";
import Button from "@/ui/Button";
import Modal from "@/widgets/layout/Modal";
import { Edit, Eye, Plus, Trash2, UserPlus } from "lucide-react";
import React, { useState } from "react";

const columns = [
  { header: "Tickets", accessor: "tickets" },
  { header: "Submitted By", accessor: "submittedby" },
  { header: "Status", accessor: "status" },
  { header: "Assigned ", accessor: "assigned" },
];

const initialData = [
  { tickets: "Water leak in common area", submittedby: "Sarah Wilson", status: "Active" , assigned : 'Unassigned' },
  { tickets: "Water leak in common area", submittedby: "Sarah Wilson", status: "Active" ,  assigned : 'Unassigned ' },
  { tickets: "Water leak in common area", submittedby: "Sarah Wilson", status: "Inactive" , assigned : 'Unassigned ' },
];

const AssignSupport = () => {
  const [data, setData] = useState(initialData);
  const [filteredData, setFilteredData] = useState(initialData);
  const [isModalOpen , setIsModalOpen] = useState(false)

  const handleSearch = (query) => {
    if (!query) {
      setFilteredData(data);
      return;
    }

    const lowerCaseQuery = query.toLowerCase();
    const filtered = data.filter(
      (item) =>
        item.tickets.toLowerCase().includes(lowerCaseQuery) ||
        item.submittedby.toLowerCase().includes(lowerCaseQuery) ||
        item.status.toLowerCase().includes(lowerCaseQuery) ||
        item.assigned.toLowerCase().includes(lowerCaseQuery),
    );

    setFilteredData(filtered);
  };

  const handleAddNew = () => {
    console.log("Add new user");
  };

  const handleView = (row) => {
    console.log("View:", row);
  };

 const handleOpen = () =>{
  setIsModalOpen(true)
 }

  return (
    <div className="container mx-auto px-4 py-6">
      <Heading heading="Assign Support" />

      <div className="flex justify-end gap-6 mb-6">
        <Button onClick={handleAddNew} icon={<UserPlus size={20} />}>
          Add New
        </Button>
        <div>
          <SearchBar onSearch={handleSearch} placeholder="Search here" />
        </div>
      </div>

      <DynamicTable
        columns={columns}
        data={filteredData}
        rowsPerPage={5}
        actions={[
          { icon: Eye, onClick: handleView },
          { icon: UserPlus, onClick: handleOpen },
        ]}
      />

      {isModalOpen && 
       <Modal isOpen={handleOpen}
       onClose={() => setIsModalOpen(false)}
       >
        <Heading heading="Assign Tickets"/>
        <h1 className="font-manrope">Assign 1 ticket(s) to a team member</h1>
  
       </Modal>
      }
    </div>
  );
};

export default AssignSupport;
