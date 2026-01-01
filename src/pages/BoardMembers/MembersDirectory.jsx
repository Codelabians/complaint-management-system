import Heading from "@/common/Heading";
import Button from "@/ui/Button";
import React, { useState } from "react";

const MEMBERS_DATA = [
  {
    id: 1,
    fullName: "Abby Scaldione",
    houseNo: "10108",
    address: "Countrywood North Rd",
    email: "abby@westlanefamilydentist.com",
    role: "Member",
    cell: "919-272-3444",
  },
  {
    id: 2,
    fullName: "Abby Scaldione",
    houseNo: "10108",
    address: "Countrywood North Rd",
    email: "abby@westlanefamilydentist.com",
    role: "Member",
    cell: "919-272-3444",
  },
  {
    id: 3,
    fullName: "Abby Scaldione",
    houseNo: "10108",
    address: "Countrywood North Rd",
    email: "abby@westlanefamilydentist.com",
    role: "Member",
    cell: "919-272-3444",
  },
  {
    id: 4,
    fullName: "Abby Scaldione",
    houseNo: "10108",
    address: "Countrywood North Rd",
    email: "abby@westlanefamilydentist.com",
    role: "Member",
    cell: "919-272-3444",
  },
  {
    id: 5,
    fullName: "Abby Scaldione",
    houseNo: "10108",
    address: "Countrywood North Rd",
    email: "abby@westlanefamilydentist.com",
    role: "Member",
    cell: "919-272-3444",
  },
  {
    id: 6,
    fullName: "Abby Scaldione",
    houseNo: "10108",
    address: "Countrywood North Rd",
    email: "abby@westlanefamilydentist.com",
    role: "Member",
    cell: "919-272-3444",
  },
  {
    id: 7,
    fullName: "Abby Scaldione",
    houseNo: "10108",
    address: "Countrywood North Rd",
    email: "abby@westlanefamilydentist.com",
    role: "Member",
    cell: "919-272-3444",
  },
  {
    id: 8,
    fullName: "Abby Scaldione",
    houseNo: "10108",
    address: "Countrywood North Rd",
    email: "abby@westlanefamilydentist.com",
    role: "Member",
    cell: "919-272-3444",
  },
  {
    id: 9,
    fullName: "Abby Scaldione",
    houseNo: "10108",
    address: "Countrywood North Rd",
    email: "abby@westlanefamilydentist.com",
    role: "Member",
    cell: "919-272-3444",
  },
  {
    id: 10,
    fullName: "Abby Scaldione",
    houseNo: "10108",
    address: "Countrywood North Rd",
    email: "abby@westlanefamilydentist.com",
    role: "Member",
    cell: "919-272-3444",
  },
  {
    id: 11,
    fullName: "Abby Scaldione",
    houseNo: "10108",
    address: "Countrywood North Rd",
    email: "abby@westlanefamilydentist.com",
    role: "Member",
    cell: "919-272-3444",
  },
  {
    id: 12,
    fullName: "Abby Scaldione",
    houseNo: "10108",
    address: "Countrywood North Rd",
    email: "abby@westlanefamilydentist.com",
    role: "Member",
    cell: "919-272-3444",
  },
];

const MembersDirectory = () => {
  const [keyword, setKeyword] = useState("");
  const [searchBy, setSearchBy] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const filteredMembers = MEMBERS_DATA.filter((member) => {
    if (!keyword) return true;

    const searchFields = {
      fullName: member.fullName,
      houseNo: member.houseNo,
      address: member.address,
      email: member.email,
      role: member.role,
      cell: member.cell,
    };

    if (searchBy) {
      return searchFields[searchBy]
        ?.toLowerCase()
        .includes(keyword.toLowerCase());
    }

    return Object.values(searchFields).some((field) =>
      field?.toLowerCase().includes(keyword.toLowerCase()),
    );
  });

  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentMembers = filteredMembers.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handleSearch = () => {
    setCurrentPage(1);
    console.log("Search with keyword:", keyword, "and filter:", searchBy);
  };

  const handleUpdateNow = () => {
    console.log("Update Now clicked");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
       
      <div className="w-full md:w-[90%] mx-auto">
         <Heading heading="HOA Members Directory" />
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div>
              <label className="block text-sm font-semibold mb-2">
                Keyword
              </label>
              <input
                type="text"
                placeholder="Search"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">
                Search by
              </label>
              <select
                value={searchBy}
                onChange={(e) => setSearchBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent"
              >
                <option value="">Select</option>
                <option value="fullName">Full Name</option>
                <option value="houseNo">House No</option>
                <option value="address">Address</option>
                <option value="email">Email</option>
                <option value="role">Role</option>
                <option value="cell">Cell</option>
              </select>
            </div>
            <div>
              <Button onClick={handleSearch} >
                  Search
              </Button>
            </div>
        
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                    Full Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                    House No
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                    Address
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                    Cell#
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentMembers.map((member) => (
                  <tr
                    key={member.id}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-4 py-3 whitespace-nowrap text-sm ">
                      {member.fullName}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm ">
                      {member.houseNo}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm ">
                      {member.address}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      {member.email}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm ">
                      {member.role}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm ">
                      {member.cell}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-end mb-6 cursor-pointer">
          <div className="flex items-center space-x-2">
            <span className="w-8 h-8 bg-orange text-white rounded-full flex items-center justify-center text-sm font-medium">
              {currentPage}
            </span>
            <span className="text-gray-600">2</span>
            <span className="text-gray-600">3</span>
            <button className="text-orange text-sm font-medium">
              Next &gt;
            </button>
          </div>
        </div>

        {/* Update Button */}
        <div className="float-right">
          <Button
            onClick={handleUpdateNow}
            className="px-8 py-3 text-sm bg-orange  text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 shadow-sm"
          >
            Update Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MembersDirectory;
