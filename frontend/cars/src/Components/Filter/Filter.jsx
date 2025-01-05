import { useState, useEffect, useContext } from "react";
import { SearchContext } from "../../Contexts/SearchContext";
import FilterGroup from "./FilterGroup";

export default function Filter() {
    const [filter, setFilter] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    const { searchListData, setSearchListData, filterListData, setFilterListData } = useContext(SearchContext);

    const filterGroups = [
        {
            legend: "type",
            inputs: ["Limuzina", "HecBek", "Prikolica", "SUV", "Karavan"],
        },
        {
            legend: "Gepek",
            inputs: ["350L", "450L", "550L", "550L<"],
        },
        {
            legend: "transmission",
            inputs: ["Automatic", "Manual"],
        },
    ];

    //if filterListData State is not empty it renders in app.jsx otherwise searchListData is being rendered.


    /**
     * 
     * @param {String} value 
     * @param {Boolean} checked 
     * HOW FILTER WORKS?
     * on every click on checkboxes this onFilterChange function triggers.
     * filters are added or deleted from the list
     * next function is called *updateList*
     * again filters are added to diffrent list due to how react works(filter state isnt updated at the right time)
     * filterData state is filling with filtered cars
     * 
     */
    const onFilterChange = (value, checked) => {
        console.log(value, checked);

        setFilter((prevFilter) =>
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

        setFilteredData(
            searchListData.filter((car) => {
                return updatedFilters.every((filter) => {
                    // Proveri sve filtere
                    if (filterGroups[0].inputs.includes(filter)) {
                        return car.type === filter; // Filtriraj po tipu
                    } else if (filterGroups[1].inputs.includes(filter)) {
                        return car.gepek === filter; // Filtriraj po gepeku
                    } else if (filterGroups[2].inputs.includes(filter)) {
                        return car.transmission === filter; // Filtriraj po transmisiji
                    }
                    return true;
                });
            })
        );
    };


    //filterListData Context API
    useEffect(() => {

        setFilterListData(filteredData);
    }, [filteredData]);


    return (
        <>
            {filterGroups.map((group, index) => (
                <FilterGroup
                    key={index}
                    group={group}
                    onFilterChange={onFilterChange}
                    selectedFilters={filter}
                />
            ))}
        </>
    );
}
