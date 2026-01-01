
import React, { useState, useEffect, useCallback } from 'react';
import { Search, X } from 'lucide-react';

// Custom useDebounce hook
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Reusable SearchBar component
const SearchBar = ({ 
  placeholder = "Search...", 
  onSearch, 
  debounceDelay = 300,
  className = "",
  showClearButton = true,
  disabled = false,
  size = "md"
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, debounceDelay);

  // Effect to trigger search when debounced value changes
  useEffect(() => {
    if (onSearch) {
      onSearch(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, onSearch]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  // Size variants
  const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-3 text-base", 
    lg: "px-5 py-4 text-lg"
  };

  return (
    <div className={`relative max-w-md w-full mx-auto ${className}`}>
      <div className="relative">
        <Search 
          className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 ${
            size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5'
          }`} 
        />
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleInputChange}
          disabled={disabled}
          className={`
            w-full pl-10 pr-10 border border-gray-300 rounded-lg
            focus:ring-2 focus:ring-orange focus:border-orange
            outline-none transition-all duration-200
            disabled:bg-gray-100 disabled:cursor-not-allowed
            ${sizeClasses[size]}
            ${disabled ? 'text-gray-500' : 'text-gray-900'}
          `}
        />
        {showClearButton && searchTerm && (
          <button
            onClick={clearSearch}
            className={`
              absolute right-3 top-1/2 transform -translate-y-1/2 
              text-gray-400 hover:text-gray-600 transition-colors
              ${size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5'}
            `}
          >
            <X className="w-full h-full" />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar