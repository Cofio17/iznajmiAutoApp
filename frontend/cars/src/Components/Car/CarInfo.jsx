
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import groupIcon from '../../assets/icons/group.png'
import listIcon from '../../assets/icons/list.png'
import benzinIcon from '../../assets/icons/benzin.png'
import doorIcon from '../../assets/icons/door.png'
import carIcon from '../../assets/icons/small-car.png'

import { faGasPump, faDoorOpen, faCar, faLocationDot, faList, faUsers, faCarBurst } from '@fortawesome/free-solid-svg-icons'
export default function CarInfo({ carData, header }) {


    return (

        <div className="container-car-data car-info">
            <h3>{header}</h3>

            <div className="content">
                <div className='content-data'>

                    <p> <img className='icon' src={carIcon} alt="icon " /> <b></b><span> {carData.transmission}</span></p>
                    <hr className='info-divider' />
                    <p> <img className='icon' src={benzinIcon} alt="icon " /><b></b><span>{carData.fuelType}</span></p>
                    <hr className='info-divider' />
                    <p> <img className='icon' src={groupIcon} alt="icon " /><b></b><span>{carData.seats}</span></p>
                    <hr className='info-divider' />

                </div>


                <div className='content-data'>
                    <p><img className='icon' src={doorIcon} alt="icon " /><b></b><span> {carData.doors}</span></p>
                    <hr className='info-divider' />
                    <p><img className='icon' src={groupIcon} alt="icon " /><b></b><span>{carData.insuranceIncluded ? 'Da' : 'Ne'}</span></p>
                    <hr className='info-divider' />
                    <p><FontAwesomeIcon color='#2D6A4F' icon={faLocationDot} /><b> </b><span> {carData.location}</span></p>
                    <hr className='info-divider' />
                    <ul className='features-list'>
                        <div>
                            <p><img className='icon' src={listIcon} alt="icon " /><b></b></p>
                        </div>
                        {carData.features.map((feature, index) => {
                            return <li className='feature-item' key={index}>{feature}</li>
                        })}
                    </ul>
                </div>
            </div>



        </div>
    )
}