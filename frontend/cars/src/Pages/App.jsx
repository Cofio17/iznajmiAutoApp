import "../App.css";
import { useEffect, useContext, useState } from "react";
import { SearchContext } from "../Contexts/SearchContext";
import AlertBox from "../utils/Alert/Alert";
import LoadingCircle from "../utils/LoadingCircle/LoadingCircle";
import CarList from "../Components/CarList/CarList";
import Sidebar from "../Components/Sidebar/Sidebar";
import Filter from "../Components/Filter/Filter";
import { useLoaderData, useLocation } from "react-router-dom";
import Layout from "../Components/Layout/Layout";

function App() {
  const {
    loading,
    setSearchListData,
    searchListData,
    filterListData,
    filtersContext,
    hasSearched
  } = useContext(SearchContext);
  const carsData = useLoaderData();
  const [initialLoad, setInitialLoad] = useState(true); // Track initial load
  const location = useLocation();


  const header = 'Pronadji Idealan Auto';

  useEffect(() => {
    document.title = "Izaberite Vas Auto";

    // Only set the initial data if searchListData is empty and it's the initial load
    if (!hasSearched && searchListData.length === 0) {
      setSearchListData(carsData);
    }
  }, [carsData, setSearchListData, searchListData, initialLoad]);

  useEffect(() => {
    // Save searchListData to localStorage whenever it changes
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