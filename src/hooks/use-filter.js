import { useState, useEffect, useCallback } from "react";

export const useFilter = (data, initialFilters = {}) => {
  const [filters, setFilters] = useState(initialFilters);
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    applyFilters();
  }, [data, filters, applyFilters]);

  const applyFilters = useCallback(() => {
    let result = [...data];
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== "") {
        if (key === "searchTerm") {
          result = result.filter((item) =>
            JSON.stringify(item).toLowerCase().includes(value.toLowerCase())
          );
        } else {
          result = result.filter((item) => item[key] === value);
        }
      }
    });

    setFilteredData(result);
  }, [data, filters]);

  const updateFilters = useCallback((newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(initialFilters);
    setFilteredData(data);
  }, [data, initialFilters]);

  return {
    filteredData,
    filters,
    updateFilters,
    applyFilters,
    clearFilters,
  };
};
