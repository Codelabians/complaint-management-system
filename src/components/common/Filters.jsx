import { Filter, X } from "lucide-react";
import { useState } from "react";

 const Filters = ({
  filters = [],
  values = {},
  onChange,
  onClear,
  showToggle = true,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (key, value) => {
    onChange({ ...values, [key]: value });
  };

  const handleClear = () => {
    const cleared = filters.reduce((acc, filter) => {
      acc[filter.key] =
        filter.type === "dateRange" ? { start: "", end: "" } : "";
      return acc;
    }, {});
    onChange(cleared);
    if (onClear) onClear();
  };

  const hasActiveFilters = Object.values(values).some((val) => {
    if (typeof val === "object" && val !== null) {
      return val.start || val.end;
    }
    return val !== "";
  });

  return (
    <div className={`w-full ${className}`}>

        <div className=" p-7 mt-5 bg-gradient-to-br from-white to-gray-50/50 rounded-2xl border border-gray-200/60 shadow-xl backdrop-blur-sm">
          <div className="flex items-center justify-between mb-6">
          
            {hasActiveFilters && (
              <button
                onClick={handleClear}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors font-medium"
              >
                <X size={16} />
                Clear All
              </button>
            )}
          </div>

          <div
            className={`grid grid-cols-1 w-[80%] ${
              filters.length === 1
                ? "md:grid-cols-1"
                : filters.length === 2
                ? "md:grid-cols-2"
                : filters.length === 3
                ? "md:grid-cols-3"
                : "md:grid-cols-2 lg:grid-cols-4"
            } gap-5`}
          >
            {filters.map((filter) => {
              const value =
                values[filter.key] ||
                (filter.type === "dateRange" ? { start: "", end: "" } : "");

              if (filter.type === "text") {
                return (
                  <div key={filter.key} className="flex flex-col space-y-2">
                    <label className="text-sm font-semibold text-gray-700 pl-0.5">
                      {filter.label}
                    </label>
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => handleChange(filter.key, e.target.value)}
                      placeholder={
                        filter.placeholder ||
                        `Search ${filter.label.toLowerCase()}...`
                      }
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm transition-all hover:border-gray-400"
                    />
                  </div>
                );
              }

              if (filter.type === "select") {
                return (
                  <div key={filter.key} className="flex flex-col space-y-2">
                    <label className="text-sm font-semibold text-gray-700 pl-0.5">
                      {filter.label}
                    </label>
                    <select
                      value={value}
                      onChange={(e) => handleChange(filter.key, e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm transition-all hover:border-gray-400 appearance-none cursor-pointer"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
                        backgroundPosition: "right 0.5rem center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "1.5em 1.5em",
                        paddingRight: "2.5rem",
                      }}
                    >
                      <option value="">{filter.allLabel || "All"}</option>
                      {filter.options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                );
              }

              if (filter.type === "dateRange") {
                return (
                  <div key={filter.key} className="flex flex-col space-y-2">
                    <label className="text-sm font-semibold text-gray-700 pl-0.5">
                      {filter.label}
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="date"
                        value={value.start}
                        onChange={(e) =>
                          handleChange(filter.key, {
                            ...value,
                            start: e.target.value,
                          })
                        }
                        className="flex-1 px-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm transition-all hover:border-gray-400 text-sm"
                      />
                      <input
                        type="date"
                        value={value.end}
                        onChange={(e) =>
                          handleChange(filter.key, { ...value, end: e.target.value })
                        }
                        className="flex-1 px-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm transition-all hover:border-gray-400 text-sm"
                      />
                    </div>
                  </div>
                );
              }

              return null;
            })}
          </div>
        </div>
    </div>
  );
};

export default Filters;