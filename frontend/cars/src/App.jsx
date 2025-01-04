import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import './App.css'
import Header from './Components/Header'
import HeroHeader from './Components/HeroHeader/HeroHeader'
import { SearchContext } from './Contexts/SearchContext'
import { Alert } from '@mui/material';
import Footer from './Components/Footer';
import LoadingCircle from './utils/LoadingCircle/LoadingCircle'
import CarList from './Components/CarList/CarList'
import Sidebar from './Components/Sidebar/Sidebar'
import Filter from './Components/Filter/Filter'


function App() {
  const [cars, setCars] = useState([]);
  const localhost = import.meta.env.VITE_LOCAL_HOST;
  //Custom Context API
  const { loading, searchListData } = useContext(SearchContext);

  const getCars = async () => {
    try {
      const response = await axios.get(`${localhost}cars`);
      setCars(response.data.data);
    } catch (error) {
      console.log(`error fetching data ${error}`);
    }

  }


  useEffect(() => {
    document.title = "Izaberite Vas Auto";

    const fetchCars = async () => {
      await getCars();
    }
    fetchCars();
  }, [searchListData]);


  return (
    <>
      <Header />
      <HeroHeader header='Find Your Ideal Car' />
      <main className='sidebar-cars-list'>
        <Sidebar>
          <Filter />
        </Sidebar>
        {loading ?
          <LoadingCircle /> : searchListData.length === 0 ?
            <div style={{ marginTop: 120 }}>
              <Alert className='fit-content' severity='info' >Nazalost, nema slobodnih autombila za izabrani period.Pogledajte Celu Ponudu</Alert>
              <CarList list={cars} />
            </div>
            :
            <CarList list={searchListData} />
        }
        <Sidebar />
      </main >
      <Footer />
    </>
  )
}

export default App
