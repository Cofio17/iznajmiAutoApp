import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGasPump, faDoorOpen, faCar, faUsers } from '@fortawesome/free-solid-svg-icons'
export default function CarCard({ carData }) {


    return (
        <Link to={`car/${carData.licensePlate}`}>
            <div className="car-card"  >

                <div className="car-card-image">
                    <div className="overlay"></div>
                    <img src={carData.image} alt="car-image" />
                </div>
                <div>
                    <h2 className="car-card-header">{carData.brand} {carData.model}</h2>
                </div>
                <div className="car-card-info">
                    <div className="info left">
                        <p> <FontAwesomeIcon className='icon' icon={faCar} /> <span>: {carData.transmission}</span></p>
                        <p> <FontAwesomeIcon className='icon' icon={faGasPump} /><span>: {carData.fuelType}</span></p>

                    </div>
                    <div className="info right">
                        <p> <FontAwesomeIcon className='icon' icon={faUsers} /><span>: {carData.seats}</span></p>
                        <p> <FontAwesomeIcon className='icon' icon={faDoorOpen} /><span>: {carData.doors}</span></p>
                    </div>
                </div>
                <div className="car-card-price">
                    <hr />
                    <p>{carData.pricePerDay}€/Day</p>
                </div>

            </div>
        </Link>

    )

}