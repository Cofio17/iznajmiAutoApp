import { useContext, useEffect } from "react";
import { SearchContext } from "../../Contexts/SearchContext";
import FilterGroup from "./FilterGroup";
import countMatchingValues from "./countMatchingValues";
import { useLocation } from "react-router-dom";
import './filter.scss';
import PriceSlider from "./Slider";

const transmissionMap = {
  "Automatski": "Automatic",
  "Manuelni": "Manual"
};

const displayMap = {
  "Automatic": "Automatski",
  "Manual": "Manuelni"
};

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
    const numberOfTypesTrunk = countMatchingValues(filterGroups, updatedFilters, 1);

    const filteredCars = searchListData.filter((car) => {
      const categoryFilters = updatedFilters.filter((f) => filterGroups[0].inputs.includes(f));
      const trunkFilters = updatedFilters.filter((f) => filterGroups[1].inputs.includes(f));
      const transmissionFilters = updatedFilters.filter((f) => Object.values(transmissionMap).includes(f));

      // Handle cases where type might be undefined or not an array
      const matchesCategory = categoryFilters.length === 0 || (
        Array.isArray(car.type) && categoryFilters.some((filter) => car.type.includes(filter))
      );

      const matchesTrunk = trunkFilters.length === 0 || (
        numberOfTypesTrunk > 1
          ? trunkFilters.some((filter) => isInRange(filter, car.trunkCapacity))
          : trunkFilters.every((filter) => isInRange(filter, car.trunkCapacity))
      );

      const matchesTransmission = transmissionFilters.length === 0 || transmissionFilters.every((filter) => car.transmission === filter);

      return matchesCategory && matchesTrunk && matchesTransmission && car.pricePerDay <= maxPrice;
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