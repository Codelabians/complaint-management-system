import React, { useState } from "react";
import {
  FolderPlus,
  Upload,
  RefreshCw,
  Trash2,
  Edit3,
  FileText,
} from "lucide-react";
import Heading from "@/common/Heading";
import NewFolder from "./components/NewFolder";
import UploadFile from "./components/UploadFile";
import FileSelect from "./components/FileSelect";
import Button from "@/ui/Button";

export default function ManageDocs() {
  const [activeTab, setActiveTab] = useState("manage");
  const files = [
    { name: "FOBs Info", lastModified: "3 months ago" },
    { name: "SAYOR Forms", lastModified: "3 months ago" },
    { name: "Emerywood Project", lastModified: "3 months ago" },
    { name: "FOBs Info", lastModified: "3 months ago" },
    { name: "SAYOR Forms", lastModified: "3 months ago" },
    { name: "Emerywood Project", lastModified: "3 months ago" },
  ];

  return (
    <div className="w-full md:w-[90%] mx-auto">
      <Heading heading="Manage Docs" />

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex flex-wrap  items-center gap-3">
            <button
              onClick={() => setActiveTab("manage")}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "manage"
                  ? "bg-grey text-white"
                  : "hover:bg-grey hover:text-white"
              }`}
            >
              <FolderPlus size={16} />
              New Folder
            </button>

            <button
              onClick={() => setActiveTab("upload")}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "upload"
                  ? "bg-grey text-white"
                  : "hover:bg-grey hover:text-white"
              }`}
            >
              <Upload size={16} />
              Upload File
            </button>

            <button
              onClick={() => setActiveTab("update")}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "update"
                  ? "bg-grey text-white"
                  : "hover:bg-grey hover:text-white"
              }`}
            >
              <Edit3 size={16} />
              Update
            </button>

            <button
              onClick={() => setActiveTab("refresh")}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "refresh"
                  ? "bg-grey text-white"
                  : "hover:bg-grey hover:text-white"
              }`}
            >
              <RefreshCw size={16} />
              Refresh
            </button>

            <button
              onClick={() => setActiveTab("delete")}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "delete"
                  ? "bg-grey text-white"
                  : "hover:bg-grey hover:text-white"
              }`}
            >
              <Trash2 size={16} />
              Delete
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "manage" && <NewFolder />}
        {activeTab === "upload" && <UploadFile />}
        {activeTab === "update" && <FileSelect />}
        {activeTab === "delete" && <FileSelect />}

        {/* File List Header */}
        <div className="flex items-center justify-between px-6 py-3 bg-gray-100 border-b border-gray-200">
          <div className="text-sm font-semibold">Name</div>
          <div className="text-sm font-semibold">Last Modified</div>
        </div>

        {/* File List */}
        <div className="divide-y divide-gray-100">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <FileText size={20} />
                <span className="text-sm font-medium text-gray-900">
                  {file.name}
                </span>
              </div>
              <span className="text-sm">{file.lastModified}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
