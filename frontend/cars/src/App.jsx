import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import './App.css'
import Header from './Components/Header'
import HeroHeader from './Components/HeroHeader/HeroHeader'
import CarCard from './Components/CarCard/CarCard'
import { useLocation } from 'react-router-dom'
import { SearchContext } from './Contexts/SearchContext'

function App() {
  const [cars, setCars] = useState([]);
  //Custom Context API
  const { searchListData } = useContext(SearchContext);
  const location = useLocation();

  // const localhost = process.env.LOCAL_HOST;
  const carsLink = 'http://localhost:5000/cars'


  useEffect(() => {

    document.title = "Izaberite Vas Auto"
    /**
     * if redirect triggers, that data is being used otherwise all cars are being fetched
     */
    const getCars = async () => {
      try {
        if (!location.state) {
          const response = await axios.get(`${carsLink}`);
          setCars(response.data.data);
        }
        else {
          setCars(location.state);
        }


      } catch (error) {
        console.log(`error fetching data ${error}`);

      }
    }

    /**
     * if cars array is empty getCars is being cald otherwise data is being obtainer through context API
     */
    const handleDataChange = async () => {
      if (cars.length < 1) {
        await getCars();
      }
      else {
        setCars(searchListData);
      }

    }

    handleDataChange();
  }, [searchListData])

  return (
    <>
      <Header />
      <main>
        <HeroHeader header='Find Your Ideal Car' />
        <ul className='container-car-cards'>
          {cars.map((car) => {
            return <li key={car.licensePlate}><CarCard carData={car} /></li>
          })}
        </ul>

      </main>

    </>
  )
}

export default App
