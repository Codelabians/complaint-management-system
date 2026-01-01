import DynamicTable from "@/common/DynamicTable";
import Heading from "@/common/Heading";
import SearchBar from "@/common/SearchInput";
import Button from "@/ui/Button";
import { Eye, Plus, Trash2 } from "lucide-react";
import React, { useState } from "react";

const columns = [
  { header: "Tickets", accessor: "tickets" },
  { header: "Submitted By", accessor: "submittedby" },
  { header: "Status", accessor: "status" },
  { header: "Assigned ", accessor: "assigned" },
];

const initialData = [
  { tickets: "Water leak in common area", submittedby: "Sarah Wilson", status: "Active" , assigned : 'Mike Johnson' },
  { tickets: "Water leak in common area", submittedby: "Sarah Wilson", status: "Active" ,  assigned : 'Mike Johnson' },
  { tickets: "Water leak in common area", submittedby: "Sarah Wilson", status: "Inactive" , assigned : 'Mike Johnson' },
];

const Tickets = () => {
  const [data, setData] = useState(initialData);
  const [filteredData, setFilteredData] = useState(initialData);

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

  const handleDelete = (row) => {
    console.log("Delete:", row);
    const updatedData = data.filter((item) => item.member !== row.member);
    setData(updatedData);
    setFilteredData(updatedData);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <Heading heading="Tickets" />

      <div className="flex justify-end gap-6 mb-6">
        <Button onClick={handleAddNew} icon={<Plus />}>
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
          { icon: Trash2, onClick: handleDelete },
        ]}
      />
    </div>
  );
};

export default Tickets;
