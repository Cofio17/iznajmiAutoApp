import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'
import { Link } from 'react-router-dom'
import Header from './Components/Header'

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
      <h1>Iznajmi me - Automobili</h1>
      <ul>
        {cars.map((car) => {
          return <li key={car.licensePlate}><Link to={`/car/${car.licensePlate}`}>{car.brand} {car.model} {car.year}</Link></li>
        })}
      </ul>

    </>
  )
}

export default App
