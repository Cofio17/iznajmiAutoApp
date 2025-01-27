import "../App.css";
import { useEffect, useContext } from "react";
import { SearchContext } from "../Contexts/SearchContext";
import AlertBox from "../utils/Alert/Alert";
import LoadingCircle from "../utils/LoadingCircle/LoadingCircle";
import CarList from "../Components/CarList/CarList";
import Sidebar from "../Components/Sidebar/Sidebar";
import Filter from "../Components/Filter/Filter";
import { useLoaderData } from "react-router-dom";
import Layout from "../Components/Layout/Layout";
import { useLocation } from "react-router-dom";

function App() {
  const {
    loading,
    setSearchListData,
    searchListData,
    filterListData,
    filtersContext,
  } = useContext(SearchContext);
  const carsData = useLoaderData();

  const header = 'Pronadji Idealan Auto';


  useEffect(() => {
    document.title = "Izaberite Vas Auto";
    console.log(searchListData);

    if (searchListData.length === 0) {
      setSearchListData(carsData); // Postavi učitane podatke u kontekst
    }
  }, [carsData, setSearchListData, searchListData]);

  useEffect(() => {

    const savedSearchListData = localStorage.getItem("searchListData");
    if (!savedSearchListData || JSON.parse(savedSearchListData).length === 0) {
      setSearchListData(carsData); // Postavi učitane podatke u kontekst
    } else {
      setSearchListData(JSON.parse(savedSearchListData));
    }
  }, [carsData, setSearchListData]);

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
      <Sidebar />
    </Layout>

  );
}

export default App;
