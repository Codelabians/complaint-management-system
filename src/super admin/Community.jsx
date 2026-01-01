import DynamicTable from '@/common/DynamicTable'
import Heading from '@/common/Heading'
import SearchBar from '@/common/SearchInput'
import Button from '@/ui/Button'
import { Edit, Eye, Plus, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const columns = [
  { header: "Community", accessor: "community" },
  { header: "Status", accessor: "status" },
];

const initialData = [
  { community: "Stonebridge", status: "Active" },
  { community: "Stonebridge ",  status: "Active" },
  { community: "Stonebridge ",status: "Inactive" },
  { community: "Stonebridge ",  status: "Active" },
  { community: "Stonebridge ",  status: "Active" },
  { community: "Stonebridge ",  status: "Inactive" },
  { community: "Stonebridge ",  status: "Active" },
];

const Community = () => {
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
        item.community.toLowerCase().includes(lowerCaseQuery) ||
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
    // Optional: Add delete functionality
    const updatedData = data.filter(item => item.member !== row.member);
    setData(updatedData);
    setFilteredData(updatedData);
  };

  

  return (
    <div className="container mx-auto px-4 py-6">
      <Heading heading="Community" />
      
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

export default Community;