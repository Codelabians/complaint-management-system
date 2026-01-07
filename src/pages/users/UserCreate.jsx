import AddButton from "@/components/common/AddButton";
import Header from "@/components/common/Header";
import Modal from "@/components/common/Modal";
import Table from "@/components/common/Table";
import FormInput from "@/components/forms/Formnput";
import { useGetQuery } from "@/services/apiService";
import { User } from "lucide-react";
import React, { useState } from "react";

const UserCreate = () => {
     const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

     const {data : users} = useGetQuery({
      path : "/dc/users"
     })
  return (
    <>
      <Header
        title="Create User"
        icon={User}
        count={12}
        actionButton={
          <AddButton text="Create" onClick={() => setIsCreateModalOpen(true)} />
        }
      />
      <Table
        
      />
      <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)}>
        <FormInput/>
      </Modal>
    </>
  );
};

export default UserCreate;
