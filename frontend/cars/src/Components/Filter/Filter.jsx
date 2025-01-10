import { useState, useEffect, useContext } from "react";
import { SearchContext } from "../../Contexts/SearchContext";
import FilterGroup from "./FilterGroup";
import countMatchingValues from "./countMatchingValues";
import { useLocation } from "react-router-dom";
import './filter.scss'

export default function Filter() {
  const [filter, setFilter] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const location = useLocation();
  const { searchListData, setFilterListData, filterListData } = useContext(SearchContext);


  const filterGroups = [
    {
      legend: "Karoserija",
      inputs: ["Limuzina", "HecBek", "Prikolica", "SUV", "Karavan"],
    },
    {
      legend: "Gepek",
      inputs: ["350L", "450L", "550L", "550L<"],
    },
    {
      legend: "Prenos",
      inputs: ["Automatic", "Manual"],
    },
  ];

  //if filterListData State is not empty it renders in app.jsx otherwise searchListData is being rendered.

  /**
   *
   * @param {string} value - label of the checkbox
   * @param {boolean} checked - true or false
   * 
   * How Does Filter Work?
   * on every click on checkboxes this onFilterChange function triggers.
   * filters are added or deleted from the list.
   * next function is called *updateList*.
   * again filters are added to diffrent list due to how react works(filter state isnt updated at the right time).
   * filterData state is filling with filtered cars.
   *
   */
  const onFilterChange = (value, checked) => {
    setFilter(
      (prevFilter) =>
        checked
          ? [...prevFilter, value] // Dodaj vrednost ako je selektovano
          : prevFilter.filter((item) => item !== value) // Ukloni vrednost ako nije selektovano
    );

    updateList(value, checked);
  };

  /**
   *
   * @param {String} value
   * @param {Boolean} checked
   */
  const updateList = (value, checked) => {
    let updatedFilters = checked
      ? [...filter, value] // Dodaj filter ako je selektovano
      : filter.filter((item) => item !== value); // Ukloni filter ako nije selektovano

    const numberOfTypes = countMatchingValues(filterGroups, updatedFilters, 0); // Proveri broj selektovanih filtera u grupi "type"

    setFilteredData(
      searchListData.filter((car) => {
        return updatedFilters.every((filter) => {
          if (filterGroups[0].inputs.includes(filter)) {
            // Ako ima više od jednog filtera u grupi "type", proveri da li bar jedan odgovara
            if (numberOfTypes > 1) {
              return updatedFilters.some(
                (typeFilter) => typeFilter === car.type
              );
            } else {
              return car.type === filter; // Provera za jedan filter
            }
          } else if (filterGroups[1].inputs.includes(filter)) {
            // Proveri da li je gepek u grupi filtera
            return updatedFilters.some(
              (groupFilter) => groupFilter === car.gepek
            );
          } else if (filterGroups[2].inputs.includes(filter)) {
            // Proveri da li je transmisija u grupi filtera
            return car.transmission === filter;
          }
          return true; // Ako nije deo filtera, auto prolazi
        });
      })
    );
  };



  useEffect(() => {

    const searchParams = new URLSearchParams(location.search);
    const tip = searchParams.get("tip");
    if (tip && !filter.includes(tip)) {
      setFilter((prevFilter) => [...prevFilter, tip]);
      updateList(tip, true);
    }

  }, [location.search]);

  //filterListData Context API
  useEffect(() => {
    console.log(`filtered data ${filteredData}`);

    setFilterListData(filteredData);
  }, [filteredData]);



  return (

    <div className="filters-container">
      {filterGroups.map((group, index) => (
        <FilterGroup
          key={index}
          group={group}
          onFilterChange={onFilterChange}
          selectedFilters={filter}
        />
      ))}
    </div>

  );
}
