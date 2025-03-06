import { useContext, useEffect } from "react";
import { SearchContext } from "../../Contexts/SearchContext";
import FilterGroup from "./FilterGroup";
import countMatchingValues from "./countMatchingValues";
import { useLocation } from "react-router-dom";
import './filter.scss'
import PriceSlider from "./Slider";

const transmissionMap = {
  "Automatski": "Automatic",
  "Manuelni": "Manual"
};

const displayMap = {
  "Automatic": "Automatski",
  "Manual": "Manuelni"
};

// NEW LINE: Added helper function to parse ranges for trunk capacity
const isInRange = (rangeStr, value) => {
  if (rangeStr === "5+") {
    return value >= 5;
  }
  const [min, max] = rangeStr.split('-').map(Number);
  return value >= min && value <= max;
};

export default function Filter() {
  const location = useLocation();

  const {
    searchListData,
    setFilterListData,
    filtersContext,
    setFiltersContext,
    maxPrice,
    setMaxPrice,
    filterListData
  } = useContext(SearchContext);

  const filterGroups = [
    {
      legend: "Karoserija",
      inputs: ["Limuzina", "Kompaktan", "Premium", "SUV", "Mini", "Porodičan"],
    },
    {
      legend: "Gepek",
      inputs: ['1-2', '3-4', '5+'],
    },
    {
      legend: "Prenos",
      inputs: ["Automatski", "Manuelni"],
    },
  ];

  const onFilterChange = (value, checked) => {
    const dbValue = transmissionMap[value] || value;
    const updatedFilters = checked
      ? [...filtersContext, dbValue]
      : filtersContext.filter((item) => item !== dbValue);

    setFiltersContext(updatedFilters);
    updateList(updatedFilters);
  };

  const updateList = (updatedFilters) => {
    const numberOfTypes = countMatchingValues(filterGroups, updatedFilters, 0);
    const numberOfTypesTrunk = countMatchingValues(filterGroups, updatedFilters, 1);

    const filteredCars = searchListData.filter((car) => {
      return updatedFilters.every((filter) => {
        if (filterGroups[0].inputs.includes(filter)) {
          if (numberOfTypes > 1) {
            return updatedFilters.some((typeFilter) => typeFilter === car.type);
          } else {
            return car.type === filter;
          }
        } else if (filterGroups[1].inputs.includes(filter)) {
          // NEW LINE: Updated logic to use isInRange for trunk capacity filtering
          if (numberOfTypesTrunk > 1) {
            // NEW LINE: Added range checking for multiple trunk selections
            return updatedFilters.some((typeFilter) =>
              filterGroups[1].inputs.includes(typeFilter) &&
              isInRange(typeFilter, car.trunkCapacity)
            );
          } else {
            // NEW LINE: Single trunk filter now uses range checking
            return isInRange(filter, car.trunkCapacity);
          }
        } else if (Object.values(transmissionMap).includes(filter)) {
          return car.transmission === filter;
        }
        return true;
      }) && car.pricePerDay <= maxPrice;
    });

    setFilterListData(filteredCars);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tip = searchParams.get("tip");

    if (tip && !filtersContext.includes(tip)) {
      const updatedFilters = [...filtersContext, tip];
      setFiltersContext(updatedFilters);
      updateList(updatedFilters);
    }
  }, [location.search]);

  useEffect(() => {
    updateList(filtersContext);
  }, [maxPrice]);

  return (
    <div className="filters-container-wrapper">
      <PriceSlider maxPrice={maxPrice} setMaxPrice={setMaxPrice} />
      <div className="filters-container">
        {filterGroups.map((group, index) => (
          <FilterGroup
            key={index}
            group={group}
            onFilterChange={onFilterChange}
            selectedFilters={filtersContext.map(filter =>
              displayMap[filter] || filter
            )}
          />
        ))}
      </div>
    </div>
  );
}