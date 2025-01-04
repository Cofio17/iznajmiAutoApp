import CarCard from "../CarCard/CarCard"
export default function CarList({ list }) {

    return (
        <ul className='container-car-cards'>
            {list.map((car) => (
                <li key={car.licensePlate}><CarCard carData={car} /></li>
            ))}
        </ul>
    )
}