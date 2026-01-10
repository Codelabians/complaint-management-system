import { BarChart3, FileText, MapPin, Users } from "lucide-react";

const Dashboard = () => {
  const stats = [
    { label: 'Total Complaints', value: '1,234', change: '+12%', color: 'bg-greenPrimary' },
    { label: 'Pending', value: '456', change: '-5%', color: 'bg-greenPrimary' },
    { label: 'Resolved', value: '778', change: '+8%', color: 'bg-greenPrimary' },
    { label: 'Active Users', value: '89', change: '+3%', color: 'bg-greenPrimary' }
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-greenDarkest">Dashboard Overview</h1>
        <p className="text-greenDarkest mt-1">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                <BarChart3 className="text-white" size={24} />
              </div>
              <span className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-greenDark">{stat.value}</h3>
            <p className="text-gray-600 text-sm mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Complaints */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-greenDark mb-4">Recent Complaints</h3>
          <div className="space-y-3">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                <div className="flex-1">
                  <p className="font-medium text-gray-800">Complaint #{item}234</p>
                  <p className="text-sm text-gray-600">Road repair issue in Sector {item}</p>
                  <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                </div>
                <span className="px-3 py-1 text-xs font-medium bg-greenLight text-white rounded-full">
                  Pending
                </span>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2 text-greenDarkest hover:bg-blue-50 rounded-lg transition-colors font-medium">
            View All Complaints
          </button>
        </div>

{/* Quick Actions */}
<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
  <h3 className="text-xl font-semibold text-greenDark mb-5">Quick Actions</h3>
  
  <div className="grid grid-cols-2 gap-4">
    {/* New Complaint */}
    <button 
      className="
        flex flex-col items-center justify-center 
        p-6 bg-greenPrimary/10 hover:bg-greenPrimary/20 
        rounded-xl transition-all duration-200 
        border border-greenPrimary/20 hover:border-greenPrimary/40
        group
      "
    >
      <div className="bg-greenPrimary/15 p-3 rounded-full mb-3 group-hover:scale-110 transition-transform">
        <FileText className="text-greenPrimary" size={28} strokeWidth={2} />
      </div>
      <span className="text-sm font-medium text-greenDark group-hover:text-greenPrimary">
        New Complaint
      </span>
    </button>

    {/* Add User */}
    <button 
      className="
        flex flex-col items-center justify-center 
        p-6 bg-greenLight/20 hover:bg-greenLight/30 
        rounded-xl transition-all duration-200 
        border border-greenLight/30 hover:border-greenLight/50
        group
      "
    >
      <div className="bg-greenLight/25 p-3 rounded-full mb-3 group-hover:scale-110 transition-transform">
        <Users className="text-greenPrimary" size={28} strokeWidth={2} />
      </div>
      <span className="text-sm font-medium text-greenDark group-hover:text-greenPrimary">
        Add User
      </span>
    </button>

    {/* View Reports */}
    <button 
      className="
        flex flex-col items-center justify-center 
        p-6 bg-greenPrimary/10 hover:bg-greenPrimary/20 
        rounded-xl transition-all duration-200 
        border border-greenPrimary/20 hover:border-greenPrimary/40
        group
      "
    >
      <div className="bg-greenPrimary/15 p-3 rounded-full mb-3 group-hover:scale-110 transition-transform">
        <BarChart3 className="text-greenPrimary" size={28} strokeWidth={2} />
      </div>
      <span className="text-sm font-medium text-greenDark group-hover:text-greenPrimary">
        View Reports
      </span>
    </button>

    {/* Manage Tehsil */}
    <button 
      className="
        flex flex-col items-center justify-center 
        p-6 bg-greenLight/20 hover:bg-greenLight/30 
        rounded-xl transition-all duration-200 
        border border-greenLight/30 hover:border-greenLight/50
        group
      "
    >
      <div className="bg-greenLight/25 p-3 rounded-full mb-3 group-hover:scale-110 transition-transform">
        <MapPin className="text-greenPrimary" size={28} strokeWidth={2} />
      </div>
      <span className="text-sm font-medium text-greenDark group-hover:text-greenPrimary">
        Manage Tehsil
      </span>
    </button>
  </div>
</div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-greenDark mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { user: 'CO Ahmed', action: 'registered new complaint', time: '10 mins ago', type: 'complaint' },
              { user: 'MC Fatima', action: 'resolved complaint #1234', time: '1 hour ago', type: 'resolved' },
              { user: 'AC Khan', action: 'assigned complaint to MC Ali', time: '2 hours ago', type: 'assigned' },
              { user: 'DC Admin', action: 'created new user CO Zain', time: '3 hours ago', type: 'user' }
            ].map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.type === 'complaint' ? 'bg-red' :
                  activity.type === 'resolved' ? 'bg-green' :
                  activity.type === 'assigned' ? 'bg-greenLight' : 'bg-greenDarkest'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-800">
                    <span className="font-medium">{activity.user}</span> {activity.action}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Overview */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-greenDark mb-4">Performance Overview</h3>
          <div className="space-y-4">
            {[
              { label: 'Resolution Rate', value: 85, color: 'bg-green' },
              { label: 'Response Time', value: 72, color: 'bg-greenLight' },
              { label: 'User Satisfaction', value: 90, color: 'bg-greenDarkest' }
            ].map((metric, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">{metric.label}</span>
                  <span className="text-sm font-bold text-gray-800">{metric.value}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`${metric.color} h-2 rounded-full transition-all duration-500`}
                    style={{ width: `${metric.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard