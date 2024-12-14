import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'
import { Link } from 'react-router-dom'
import Header from './Components/Header'
import HeroHeader from './Components/HeroHeader/HeroHeader'
import CarCard from './Components/CarCard/CarCard'
function App() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('http://localhost:5000/cars');
        setCars(response.data.data);


      } catch (error) {
        console.log(error);
      }
    }

    fetchCars();

  }, [])

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
