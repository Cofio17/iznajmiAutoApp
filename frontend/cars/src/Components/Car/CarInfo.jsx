
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGasPump, faDoorOpen, faCar, faLocationDot, faList, faUsers, faCarBurst } from '@fortawesome/free-solid-svg-icons'
export default function CarInfo({ carData, header }) {


    return (

        <div className="container-car-data">
            <h3>{header}</h3>

            <div className="content">
                <div>

                    <p> <FontAwesomeIcon className='icon' icon={faCar} /> <b>Prenos</b><span>: {carData.transmission}</span></p>
                    <hr />
                    <p> <FontAwesomeIcon className='icon' icon={faGasPump} /><b>Gorivo</b><span>: {carData.fuelType}</span></p>
                    <hr />
                    <p> <FontAwesomeIcon className='icon' icon={faUsers} /><b>Sedišta</b><span>: {carData.seats}</span></p>
                    <hr />
                    <div>
                        <p> <FontAwesomeIcon className='icon' icon={faList} /><b>Oprema</b>:</p>
                        <ul className='features-list'>

                            {carData.features.map((feature, index) => {
                                return <li key={index}>{feature}</li>
                            })}
                        </ul>
                    </div>
                </div>


                <div>
                    <p> <FontAwesomeIcon className='icon' icon={faDoorOpen} /><b>Vrata</b><span>: {carData.doors}</span></p>
                    <hr />
                    <p> <FontAwesomeIcon className='icon' icon={faCarBurst} /><b>Osiguranje</b><span>: {carData.insuranceIncluded ? 'Da' : 'Ne'}</span></p>
                    <hr />
                    <p> <FontAwesomeIcon className='icon' icon={faLocationDot} /><b>Lokacija </b><span>: {carData.location}</span></p>
                    <hr />

                </div>
            </div>



        </div>
    )
}