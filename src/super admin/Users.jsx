import DynamicTable from '@/common/DynamicTable'
import Heading from '@/common/Heading'
import SearchBar from '@/common/SearchInput'
import Button from '@/ui/Button'
import { Edit, Eye, Plus, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const columns = [
  { header: "Members", accessor: "member" },
  { header: "Role", accessor: "role" },
  { header: "Status", accessor: "status" },
];

const initialData = [
  { member: "Johnn Doe", role: "Admin", status: "Active" },
  { member: "John Doe", role: "Admin", status: "Active" },
  { member: "John Doe", role: "Admin", status: "Inactive" },
  { member: "Jane Smith", role: "User", status: "Active" },
  { member: "Mike Johnson", role: "Moderator", status: "Active" },
  { member: "Sarah Wilson", role: "Admin", status: "Inactive" },
  { member: "David Brown", role: "User", status: "Active" },
  { member: "Emily Davis", role: "Admin", status: "Active" },
];

const Users = () => {
  const navigate = useNavigate()
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
        item.member.toLowerCase().includes(lowerCaseQuery) ||
        item.role.toLowerCase().includes(lowerCaseQuery) ||
        item.status.toLowerCase().includes(lowerCaseQuery)
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
    const updatedData = data.filter(item => item.member !== row.member);
    setData(updatedData);
    setFilteredData(updatedData);
  };

  

  return (
    <div className="container mx-auto px-4 py-6">
      <Heading heading="Members" />
      
      <div className="flex justify-end gap-6 mb-6">
        <Button onClick={handleAddNew} icon={<Plus/>}>
         
          Add New
        </Button>
        <div>
          <SearchBar onSearch={handleSearch} placeholder="Search here..." />
        </div>
      </div>
      
      <DynamicTable 
        columns={columns}
        data={filteredData}  
        rowsPerPage={5} 
        actions={[
          {icon : Edit , onClick: handleView},
          { icon: Eye, onClick: handleView },
          { icon: Trash2, onClick: handleDelete },
        ]}
      />
    </div>
  );
};

export default Users;