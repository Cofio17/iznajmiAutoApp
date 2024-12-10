import '../style.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGasPump, faDoorOpen, faCar, faLocationDot, faList, faUsers, faCarBurst } from '@fortawesome/free-solid-svg-icons'
export default function CarInfo({ carData, header }) {


    return (

        <div className="container-car-data">
            <h3>{header}</h3>

            <div className="content">
                <div>

                    <p> <FontAwesomeIcon className='icon' icon={faCar} /> <b>Transmission</b><span>: {carData.transmission}</span></p>
                    <hr />
                    <p> <FontAwesomeIcon className='icon' icon={faGasPump} /><b>Fuel Type</b><span>: {carData.fuelType}</span></p>
                    <hr />
                    <p> <FontAwesomeIcon className='icon' icon={faUsers} /><b>Seats</b><span>: {carData.seats}</span></p>
                    <hr />
                    <div>
                        <p> <FontAwesomeIcon className='icon' icon={faList} /><b>Features</b>:</p>
                        <ul className='features-list'>

                            {carData.features.map((feature, index) => {
                                return <li key={index}>{feature}</li>
                            })}
                        </ul>
                    </div>
                </div>


                <div>
                    <p> <FontAwesomeIcon className='icon' icon={faDoorOpen} /><b>Doors</b><span>: {carData.doors}</span></p>
                    <hr />
                    <p> <FontAwesomeIcon className='icon' icon={faCarBurst} /><b>Insurance included</b><span>: {carData.insuranceIncluded ? 'Yes' : 'No'}</span></p>
                    <hr />
                    <p> <FontAwesomeIcon className='icon' icon={faLocationDot} /><b>Location </b><span>: {carData.location}</span></p>
                    <hr />

                </div>
            </div>



        </div>
    )
}