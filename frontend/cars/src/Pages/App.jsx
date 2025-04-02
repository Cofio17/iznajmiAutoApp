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
import Seo from "../utils/SEO/Seo";

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


    // Parse URL parameters
    const searchParams = new URLSearchParams(location.search);
    const carType = searchParams.get("tip");
    const redirect = searchParams.get("redirect");
    console.log(redirect);


    if (initialLoad && !hasSearched) {
      if (JSON.parse(localStorage.getItem('searchListData')) && JSON.parse(localStorage.getItem('searchListData').length > 0)) {
        setSearchListData(JSON.parse(localStorage.getItem('searchListData')));
      }
      else {
        setSearchListData(carsData);
      }

      const storedFilteredData = JSON.parse(localStorage.getItem('filterListData'))
      // If there's a car type in the URL, apply it as a filter
      if (carType) {
        //do this if there is a localstorage items existing
        if (storedFilteredData && redirect) {
          setFilterListData(storedFilteredData);
          setFiltersContext([carType]);
        }
        //standard
        else {
          const filteredByType = carsData.filter((car) => car.type.includes(carType));
          setFilterListData(filteredByType);
          setFiltersContext([carType]); // Use string array
        }
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

  // useEffect(() => {
  //   if (localStorage.getItem('filterListData')) {
  //     localStorage.removeItem('filterListData');
  //   }
  // }, [filterListData]);

  useEffect(() => {
    if (searchListData.length > 0) {
      console.log(searchListData);

      localStorage.setItem("searchListData", JSON.stringify(searchListData));
    }
  }, [searchListData]);

  const areFiltersActive = filtersContext && filtersContext.length > 0;


  return (
    <Layout header={header} appjsx={true}>
      <Seo
        title={"Rent a Car – Automobili za Iznajmljivanje | Srbija"}
        description={'Rent a car u Srbiji brzo i jednostavno! Iznajmite vozilo po najboljim cenama. Rezervišite svoj auto online već danas!'}
        canonical={'https://iznajmi.me/rent-a-car'}
        keywords={'rent a car, iznajmi, auto, car'}

      />
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