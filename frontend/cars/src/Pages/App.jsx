import "../App.css";
import { useEffect, useContext, useState } from "react";
import { SearchContext } from "../Contexts/SearchContext";
import AlertBox from "../utils/Alert/Alert";
import LoadingCircle from "../utils/LoadingCircle/LoadingCircle";
import CarList from "../Components/CarList/CarList";
import Sidebar from "../Components/Sidebar/Sidebar";
import Filter from "../Components/Filter/Filter";
import { useLoaderData, useLocation } from "react-router-dom"; // Add useLocation
import Layout from "../Components/Layout/Layout";

function App() {
  const {
    loading,
    setSearchListData,
    searchListData,
    filterListData,
    setFilterListData,
    filtersContext,
    setFiltersContext, // Add this to update filters
    hasSearched,
    maxPrice,
  } = useContext(SearchContext);
  const carsData = useLoaderData();
  const location = useLocation(); // To read URL parameters
  const [initialLoad, setInitialLoad] = useState(true);

  const header = "Pronadji Idealan Auto";

  useEffect(() => {
    document.title = "Izaberite Vas Auto";

    // Parse URL parameters
    const searchParams = new URLSearchParams(location.search);
    const carType = searchParams.get("tip");

    if (initialLoad && !hasSearched) {
      setSearchListData(carsData);

      // If there's a car type in the URL, apply it as a filter
      if (carType) {
        const filteredByType = carsData.filter((car) => car.type.includes(carType));
        setFilterListData(filteredByType);
        setFiltersContext([carType]); // Use string array
      }
      setInitialLoad(false);
    }
  }, [
    carsData,
    setSearchListData,
    setFilterListData,
    setFiltersContext,
    location.search,
    initialLoad,
    hasSearched,
  ]);

  useEffect(() => {
    if (searchListData.length > 0) {
      localStorage.setItem("searchListData", JSON.stringify(searchListData));
    }
  }, [searchListData]);

  const areFiltersActive = filtersContext && filtersContext.length > 0;

  return (
    <Layout header={header} appjsx={true}>
      <Sidebar filter={true}>
        <Filter />
      </Sidebar>
      {loading ? (
        <LoadingCircle />
      ) : searchListData.length === 0 ? (
        <div className="cars-list-error">
          <AlertBox
            severity={"info"}
            text={"Nažalost, nema slobodnih automobila za izabrani period"}
          />
        </div>
      ) : filterListData.length === 0 ? (
        areFiltersActive ? (
          <AlertBox
            severity={"info"}
            text={"Nažalost, nema automobila za izabrane filtere"}
          />
        ) : (
          <CarList list={searchListData} />
        )
      ) : (
        <CarList list={filterListData} />
      )}
    </Layout>
  );
}

export default App;