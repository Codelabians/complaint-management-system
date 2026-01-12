import React from 'react';
import { BarChart3, TrendingUp, AlertCircle, CheckCircle, Clock, XCircle } from 'lucide-react';

const StatCard = ({ complaints = [], isLoading = false }) => {
  const statusCount = {};
  complaints.forEach((c) => {
    const status = (c.status || 'pending').toLowerCase();
    statusCount[status] = (statusCount[status] || 0) + 1;
  });

  const categoryCount = {};
  complaints.forEach((c) => {
    const category = c.categoryId?.name || 'Uncategorized';
    categoryCount[category] = (categoryCount[category] || 0) + 1;
  });

  const sortedCategories = Object.entries(categoryCount)
    .sort(([, a], [, b]) => b - a)
    .map(([name, count]) => ({ name, count }));

  const totalComplaints = complaints.length;
  const maxCategoryCount = Math.max(...sortedCategories.map(c => c.count), 1);

  const statusConfig = {
    pending: { 
      icon: Clock, 
      color: 'from-greenDark to-greenLight',
      bg: 'bg-greenBackground',
      text: 'text-greenDarkest',
    },
    resolved: { 
      icon: CheckCircle, 
      color: 'from-emerald-500 to-green-500',
      bg: 'bg-emerald-50',
      text: 'text-emerald-700',
      border: 'border-emerald-200'
    },
    in_progress: { 
      icon: TrendingUp, 
      color: 'from-blue-500 to-cyan-500',
      bg: 'bg-blue-50',
      text: 'text-blue-700',
      border: 'border-blue-200'
    },
    rejected: { 
      icon: XCircle, 
      color: 'from-red-500 to-rose-500',
      bg: 'bg-red-50',
      text: 'text-red-700',
      border: 'border-red-200'
    }
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <div key={i} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
              <div className="space-y-4">
                {[1, 2, 3].map((j) => (
                  <div key={j} className="h-16 bg-gray-100 rounded-xl"></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

return (
    <div className="w-full max-w-7xl mx-auto p-4 space-y-6">
      {/* Status Overview Section */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-greenPrimary rounded-lg">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Status Overview</h2>
            <p className="text-gray-500 text-sm">
              {totalComplaints} total complaint{totalComplaints !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        {Object.entries(statusCount).length === 0 ? (
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-8 text-center">
            <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-2" />
            <p className="text-gray-500 font-medium text-sm">No complaints to display yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(statusCount).map(([status, count]) => {
              const config = statusConfig[status] || statusConfig.pending;
              const Icon = config.icon;
              const percentage = ((count / totalComplaints) * 100).toFixed(1);

              return (
                <div 
                  key={status}
                  className={`bg-white rounded-xl shadow-md border ${config.border} p-5 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className={`p-2.5 rounded-lg bg-gradient-to-br ${config.color}`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <span className={`text-2xl font-bold ${config.text}`}>{count}</span>
                  </div>
                  <p className={`font-semibold capitalize text-sm ${config.text} mb-1`}>
                    {status.replace(/_/g, ' ')}
                  </p>
                  <p className="text-xs text-gray-500">{percentage}% of total</p>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Categories Overview Section */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-greenPrimary rounded-lg">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Top Categories</h2>
            <p className="text-gray-500 text-sm">Most reported issues</p>
          </div>
        </div>

        {sortedCategories.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-8 text-center">
            <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-2" />
            <p className="text-gray-500 font-medium">No categories found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sortedCategories.slice(0, 8).map(({ name, count }, index) => {
         

              return (
                <div 
                  key={name}
                  className="bg-white rounded-xl shadow-md border border-gray-100 p-5 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-r from-greenDarkest to-greenBackground flex items-center justify-center text-white font-bold`}>
                      {index + 1}
                    </div>
                    <span className="text-2xl font-bold text-gray-900">{count}</span>
                  </div>
                  <p className="font-medium text-gray-800 text-sm mb-2 truncate" title={name}>
                    {name}
                  </p>
                
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;