import { createContext, useState } from "react";

// Create a context for sharing search data across components
export const SearchContext = createContext([]);

export function SearchProvider({ children }) {

    // State to manage the list of search data
    const [searchListData, setSearchListData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filterListData, setFilterListData] = useState([]);
    const [filtersContext, setFiltersContext] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);
    const [maxPrice, setMaxPrice] = useState(200);
    return (
        // Provide the search data and its updater to child components
        <SearchContext.Provider value={{ loading, setLoading, searchListData, setSearchListData, filterListData, setFilterListData, filtersContext, setFiltersContext, hasSearched, setHasSearched, maxPrice, setMaxPrice }}>
            {children}
        </SearchContext.Provider>
    )
}