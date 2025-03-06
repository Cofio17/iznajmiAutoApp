import CarCardNew from "../CarCardNew/CarCardNew"
export default function CarList({ list }) {

    return (
        <ul className='container-car-cards'>
            {list.map((car) => (
                <li key={car.licensePlate}><CarCardNew carData={car} /></li>

            ))}
        </ul>
    )
}