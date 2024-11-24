import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'
import { Link } from 'react-router-dom'

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
      <h1>Iznajmi me - Automobili</h1>
      <ul>
        {cars.map((car) => {
          return <li key={car.id}><Link to={`/car/${car.id}`}>{car.name}</Link></li>
        })}
      </ul>
    </>
  )
}

export default App
