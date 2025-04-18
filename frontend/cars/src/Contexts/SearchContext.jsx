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

// import { createContext, useState, useEffect } from "react";

// export const SearchContext = createContext([]);

// export function SearchProvider({ children }) {
//     // Initialize state with data from localStorage (if it exists)
//     const [searchListData, setSearchListData] = useState(() => {
//         // Only run this on the client side (not during SSR)
//         if (typeof window !== 'undefined') {
//             const savedData = localStorage.getItem('searchListData');
//             return savedData ? JSON.parse(savedData) : [];
//         }
//         return [];
//     });

//     const [loading, setLoading] = useState(false);
//     const [filterListData, setFilterListData] = useState([]);
//     const [filtersContext, setFiltersContext] = useState([]);
//     const [hasSearched, setHasSearched] = useState(false);
//     const [maxPrice, setMaxPrice] = useState(200);

//     return (
//         <SearchContext.Provider value={{
//             loading,
//             setLoading,
//             searchListData,
//             setSearchListData,
//             filterListData,
//             setFilterListData,
//             filtersContext,
//             setFiltersContext,
//             hasSearched,
//             setHasSearched,
//             maxPrice,
//             setMaxPrice
//         }}>
//             {children}
//         </SearchContext.Provider>
//     )
// }