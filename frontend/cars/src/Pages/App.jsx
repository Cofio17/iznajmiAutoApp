import { useEffect, useState, useContext } from "react";
import "../App.css";
import Header from "../Components/Header/Header";
import HeroHeader from "../Components/HeroHeader/HeroHeader";
import { SearchContext } from "../Contexts/SearchContext";
import AlertBox from "../utils/Alert/Alert";
import Footer from "../Components/Footer";
import LoadingCircle from "../utils/LoadingCircle/LoadingCircle";
import CarList from "../Components/CarList/CarList";
import Sidebar from "../Components/Sidebar/Sidebar";
import Filter from "../Components/Filter/Filter";
import { useLoaderData } from "react-router-dom";

function App() {
  const {
    loading,
    setSearchListData,
    searchListData,
    filterListData,
    filtersContext,
  } = useContext(SearchContext);
  const carsData = useLoaderData();

  useEffect(() => {
    document.title = "Izaberite Vas Auto";

    if (searchListData.length === 0) {
      setSearchListData(carsData); // Postavi učitane podatke u kontekst
    }
  }, [carsData, setSearchListData]);

  const areFiltersActive = filtersContext && filtersContext.length > 0;

  return (
    <>
      <Header />
      <HeroHeader header="Find Your Ideal Car" />
      <main className="sidebar-cars-list">
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
      </main>
      <Footer />
    </>
  );
}

export default App;
