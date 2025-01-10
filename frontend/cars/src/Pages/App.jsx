import { useEffect, useState, useContext } from "react";
import axios from "axios";
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
  //Custom Context API
  const {
    loading,
    setSearchListData,
    searchListData,
    filterListData,
    setLoading,
  } = useContext(SearchContext);
  const carsData = useLoaderData();

  useEffect(() => {
    document.title = "Izaberite Vas Auto";
    console.log(`useffect`);

    if (searchListData.length === 0) {
      setSearchListData(carsData); // Postavi učitane podatke u kontekst
    }
  }, [carsData, setSearchListData]);

  return (
    <>
      <Header />
      <HeroHeader header="Find Your Ideal Car" />
      <main className="sidebar-cars-list">
        <Sidebar>
          <Filter />
        </Sidebar>
        {loading ? (
          <LoadingCircle />
        ) : searchListData.length < 1 ? (
          <div className="cars-list-error">
            <AlertBox
              severity={"info"}
              text={"Nažalost, nema slobodnih autombila za izabrani period"}
            />
            {/* <CarList list={cars} />  */}
          </div>
        ) : filterListData.length === 0 ? (
          <CarList list={searchListData} />
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
