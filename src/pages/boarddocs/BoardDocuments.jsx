import Heading from "@/common/Heading";
import Button from "@/ui/Button";
import { Eye, FileText, Plus } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const documents = [
  {
    id: 1,
    name: "Financial Report 2024",
    type: "PDF",
    size: "2.4 MB",
    date: "2024-06-15",
  },
  {
    id: 2,
    name: "Meeting Minutes",
    type: "DOCX",
    size: "1.2 MB",
    date: "2024-06-14",
  },
  {
    id: 3,
    name: "Project Proposal",
    type: "PDF",
    size: "3.1 MB",
    date: "2024-06-13",
  },
  {
    id: 4,
    name: "Budget Analysis",
    type: "XLSX",
    size: "856 KB",
    date: "2024-06-12",
  },
  {
    id: 5,
    name: "Contract Agreement",
    type: "PDF",
    size: "1.8 MB",
    date: "2024-06-11",
  },
  {
    id: 6,
    name: "Marketing Strategy",
    type: "PPTX",
    size: "4.2 MB",
    date: "2024-06-10",
  },
];

const BoardDocuments = () => {
  const navigate = useNavigate();

  const handleViewDocument = () => {
    console.log("View document clicked");
  };
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className=" w-full md:w-[90%] mx-auto">
        <Heading heading="Board Documents" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-6">
          {documents.map((document) => (
            <div
              key={document.id}
              className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-center mb-4">
                <div className="p-4">
                  <FileText className="w-16 h-16 stroke-2" />
                </div>
              </div>
              <button
                onClick={() => handleViewDocument(document)}
                className="w-full bg-grey hover:bg-gray-900 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center justify-center space-x-2 transition-colors"
              >
                <Eye className="w-4 h-4" />
                <span>View Document</span>
              </button>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {documents.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No documents found
            </h3>
          </div>
        )}
      </div>

      <div className="float-right mt-4">
        <Button
          onClick={() => navigate("/portal/manage-docs")}
          icon={<Plus/>}
        
        >  Manage
          Docs</Button>
      </div>
    </div>
  );
};

export default BoardDocuments;
