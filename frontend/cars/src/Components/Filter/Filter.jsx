import { useState, useEffect, useContext } from "react";
import { SearchContext } from "../../Contexts/SearchContext";
import FilterGroup from "./FilterGroup";

export default function Filter() {
    const [filter, setFilter] = useState([]);

    const { searchListData, setSearchListData } = useContext(SearchContext);

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

    const onFilterChange = (value, checked) => {
        setFilter((prevFilter) =>
            checked
                ? [...prevFilter, value] // Dodaj vrednost ako je selektovano
                : prevFilter.filter((item) => item !== value) // Ukloni vrednost ako nije selektovano
        );
    };

    // Filtriranje podataka kada se promeni filter
    useEffect(() => {
        const filteredData = searchListData.filter((car) =>
            filter.length > 0 ? filter.includes(car.type) : true
        );
        setSearchListData(filteredData);
    }, [filter, searchListData, setSearchListData]);

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
