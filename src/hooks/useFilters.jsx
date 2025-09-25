import { useState } from "react";

export const useFilters = (initialFilters = []) => {
  const [activeFilters, setActiveFilters] = useState(initialFilters);

  const toggleFilter = (category) => {
    setActiveFilters((prev) => {
      if (prev.includes(category)) {
        return prev.filter((filter) => filter !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const removeFilter = (category) => {
    setActiveFilters((prev) => prev.filter((filter) => filter !== category));
  };

  const resetFilters = () => {
    setActiveFilters([]);
  };

  const filterData = (data, categoryKey = "category") => {
    if (activeFilters.length === 0) {
      return data;
    }
    return data.filter((item) => activeFilters.includes(item[categoryKey]));
  };

  return {
    activeFilters,
    toggleFilter,
    removeFilter,
    resetFilters,
    filterData,
  };
};
