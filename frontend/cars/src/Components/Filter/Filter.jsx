import { useContext, useEffect } from "react";
import { SearchContext } from "../../Contexts/SearchContext";
import FilterGroup from "./FilterGroup";
import countMatchingValues from "./countMatchingValues";
import { useLocation } from "react-router-dom";
import './filter.scss'
import kofer from '../../assets/images/kofer.svg'



export default function Filter() {
  const location = useLocation();
  const {
    searchListData,
    setFilterListData,
    filtersContext,
    setFiltersContext
  } = useContext(SearchContext);

  const filterGroups = [
    {
      legend: "Karoserija",
      inputs: ["Limuzina", "HecBek", "Prikolica", "SUV", "Karavan"],
    },
    {
      legend: "Gepek",
      inputs: [
        '1',
        '2',
        '3',
        '4'
      ],
    },
    {
      legend: "Prenos",
      inputs: ["Automatic", "Manual"],
    },
  ];

  /**
    * Handles changes in filter checkboxes.
    * @param {string} value - The label of the checkbox.
    * @param {boolean} checked - Indicates whether the checkbox is checked or not.
  */
  const onFilterChange = (value, checked) => {
    const updatedFilters = checked
      ? [...filtersContext, value] // Dodaj filter ako je selektovano
      : filtersContext.filter((item) => item !== value); // Ukloni filter ako nije selektovano

    setFiltersContext(updatedFilters);
    updateList(updatedFilters);
  };

  const updateList = (updatedFilters) => {
    const numberOfTypes = countMatchingValues(filterGroups, updatedFilters, 0);

    const filteredCars = searchListData.filter((car) => {
      return updatedFilters.every((filter) => {
        if (filterGroups[0].inputs.includes(filter)) {
          if (numberOfTypes > 1) {
            return updatedFilters.some((typeFilter) => typeFilter === car.type);
          } else {
            return car.type === filter;
          }
        } else if (filterGroups[1].inputs.includes(filter)) {
          return updatedFilters.some((groupFilter) => groupFilter === car.gepek);
        } else if (filterGroups[2].inputs.includes(filter)) {
          return car.transmission === filter;
        }
        return true;
      });
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

  return (
    <div className="filters-container">
      {filterGroups.map((group, index) => (
        <FilterGroup
          key={index}
          group={group}
          onFilterChange={onFilterChange}
          selectedFilters={filtersContext}
        />
      ))}
    </div>
  );
}
