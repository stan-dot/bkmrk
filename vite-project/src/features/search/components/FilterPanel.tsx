import React, { useState } from "react";
import { FilterSearch } from "../../filter/Filterer";

interface FilterPanelProps {
  onFilterChange: (filter: FilterSearch) => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({ onFilterChange }) => {
  const [filter, setFilter] = useState<FilterSearch>({
    onlyFolder: false,
    onlyBookmark: false,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    setFilter((prev) => ({
      ...prev,
      [name]: type === "date" ? new Date(value) : value,
    }));
    onFilterChange({
      ...filter,
      [name]: type === "date" ? new Date(value) : value,
    });
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setFilter((prev) => {
      const updatedFilter = {
        ...prev,
        onlyFolder: value < 0,
        onlyBookmark: value > 0,
      };
      onFilterChange(updatedFilter);
      return updatedFilter;
    });
  };

  return (
    <div id="filter-panel" className="m-2 p-2 rounded flex flex-row">
      <input
        type="text"
        name="mainPage"
        placeholder="Main page"
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="substringInName"
        placeholder="Substring in name"
        onChange={handleInputChange}
      />
      <input
        type="date"
        name="dateAddedBefore"
        onChange={handleInputChange}
      />
      <input
        type="date"
        name="dateAddedAfter"
        onChange={handleInputChange}
      />
      <input
        type="range"
        name="folderBookmarkSlider"
        min="-1"
        max="1"
        step="1"
        onChange={handleSliderChange}
      />
      <p>
        {filter.onlyFolder
          ? "Showing only folders"
          : filter.onlyBookmark
          ? "Showing only bookmarks"
          : "Showing folders and bookmarks"}
      </p>
    </div>
  );
};
