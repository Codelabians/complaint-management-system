import {
  CheckCircle,
  XCircle,
  Clock,
  Users,
  AlertCircle,
  TrendingUp,
} from "lucide-react";
import { useGetQuery } from "../services/apiService";

const MCDashboard = () => {
  /* =========================
     API: Managed Employees
  ========================== */
  const {
    data: employeeResponse,
    isLoading: employeesLoading,
    isError: employeesError,
  } = useGetQuery({
    path: "/users/managed-employees",
  });

  const employees = employeeResponse?.data ?? [];
  const totalEmployees = employeeResponse?.pagination?.totalItems ?? 0;

  /* =========================
     API: Complaints
  ========================== */
  const {
    data: complaintsResponse,
    isLoading: complaintsLoading,
    isError: complaintsError,
  } = useGetQuery({
    path: "/complaints/my-area",
  });

  const rawComplaints = complaintsResponse?.complaints ?? [];

  /* =========================
     Map API → UI
  ========================== */
  const complaints = rawComplaints.map((c) => ({
    id: c._id,
    title: c.subject || c.title || "N/A",
    status:
      c.status === "resolved"
        ? "Resolved"
        : c.status === "rejected"
        ? "Rejected"
        : "In Progress",
    priority:
      c.priority
        ? c.priority.charAt(0).toUpperCase() + c.priority.slice(1)
        : "Medium",
    area: c.area?.name || "N/A",
    assignedTo: c.assignedTo?.name || "Unassigned",
    time: new Date(c.createdAt).toLocaleString(),
  }));

  /* =========================
     Dashboard Stats (Updated)
  ========================== */
  const totalComplaints = rawComplaints.length;

  // Match the UI logic exactly
  const resolved = rawComplaints.filter(
    (c) => c.status === "resolved"
  ).length;

  const rejected = rawComplaints.filter(
    (c) => c.status === "rejected"
  ).length;

  const inProgress = rawComplaints.filter(
    (c) => c.status !== "resolved" && c.status !== "rejected"
  ).length;

  const stats = [
    {
      label: "Total Complaints",
      value: totalComplaints,
      icon: AlertCircle,
      color: "bg-greenPrimary",
    },
    {
      label: "Resolved",
      value: resolved,
      icon: CheckCircle,
      color: "bg-green",
    },
    {
      label: "In Progress",
      value: inProgress,
      icon: Clock,
      color: "bg-greenLight",
    },
    {
      label: "Rejected",
      value: rejected,
      icon: XCircle,
      color: "bg-red",
    },
    {
      label: "Total Employees",
      value: totalEmployees,
      icon: Users,
      color: "bg-greenDark",
    },
    {
      label: "Resolution Rate",
      value:
        totalComplaints > 0
          ? `${Math.round((resolved / totalComplaints) * 100)}%`
          : "0%",
      icon: TrendingUp,
      color: "bg-greenDarkest",
    },
  ];

  /* =========================
     Helpers
  ========================== */
  const getStatusColor = (status) => {
    switch (status) {
      case "Resolved":
        return "bg-green text-black";
      case "In Progress":
        return "bg-greenLight text-black";
      case "Rejected":
        return "bg-lightred text-black";
      default:
        return "bg-pastelgrey text-black";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Critical":
        return "text-red";
      case "High":
        return "text-lightred";
      case "Medium":
        return "text-greenPrimary";
      case "Low":
        return "text-greenDark";
      default:
        return "text-grey";
    }
  };

  /* =========================
     UI
  ========================== */
  return (
    <div className="min-h-screen bg-greenBackground p-6 text-grey">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-greenDarkest">
            MC Dashboard
          </h1>
          <p className="text-greenDark mt-2">
            Monitor and manage complaints in your jurisdiction
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-lg shadow border border-custom p-6"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-greenDark">
                      {stat.label}
                    </p>
                    <p className="text-3xl font-bold mt-2 text-greenDarkest">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-full`}>
                    <Icon className="w-6 h-6 text-black" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Complaints */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow border border-custom">
            <div className="p-6 border-b border-custom">
              <h2 className="text-xl font-bold text-greenDarkest">
                Recent Complaints
              </h2>
            </div>

            <div className="p-6 space-y-4">
              {complaintsLoading && (
                <p className="text-sm text-greenDark">
                  Loading complaints...
                </p>
              )}

              {complaintsError && (
                <p className="text-sm text-red">
                  Failed to load complaints
                </p>
              )}

              {!complaintsLoading && complaints.length === 0 && (
                <p className="text-sm text-greenDark">
                  No complaints found
                </p>
              )}

              {complaints.map((complaint) => (
                <div
                  key={complaint.id}
                  className="border border-custom rounded-lg p-4 hover:border-greenPrimary transition"
                >
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-semibold text-greenDarkest">
                        {complaint.title}
                      </h3>
                      <div className="flex gap-3 text-sm mt-2 text-greenDark">
                        <span
                          className={getPriorityColor(complaint.priority)}
                        >
                          {complaint.priority}
                        </span>
                        <span>• {complaint.area}</span>
                        <span>• {complaint.assignedTo}</span>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-4 rounded-full text-xs ${getStatusColor(
                        complaint.status
                      )}`}
                    >
                      {complaint.status}
                    </span>
                  </div>
                  <p className="text-xs text-greenDark mt-2">
                    {complaint.time}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Employees */}
          <div className="bg-white rounded-lg shadow border border-custom">
            <div className="p-6 border-b border-custom">
              <h2 className="text-xl font-bold text-greenDarkest">
                Team Members
              </h2>
            </div>

            <div className="p-6 space-y-4">
              {employeesLoading && (
                <p className="text-sm text-greenDark">
                  Loading employees...
                </p>
              )}

              {employeesError && (
                <p className="text-sm text-red">
                  Failed to load employees
                </p>
              )}

              {!employeesLoading && employees.length === 0 && (
                <p className="text-sm text-greenDark">
                  No employees found
                </p>
              )}

              {employees.map((employee) => (
                <div
                  key={employee.id}
                  className="border border-custom rounded-lg p-4"
                >
                  <div className="flex justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-greenDarkest">
                        {employee.name}
                      </h3>
                      <p className="text-sm text-greenDark">
                        {employee.role?.name || "N/A"}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        employee.isActive
                          ? "bg-green text-black"
                          : "bg-pastelgrey text-black"
                      }`}
                    >
                      {employee.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>

                  <div className="flex justify-between border-t border-custom pt-3 mt-3">
                    <span className="text-xs text-greenDark">
                      Complaints Assigned
                    </span>
                    <span className="text-sm font-bold text-greenDarkest">
                      {employee.totalComplaints ?? 0}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MCDashboard;
