
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import groupIcon from '../../assets/icons/group.png'
import benzinIcon from '../../assets/icons/benzin.png'
import doorIcon from '../../assets/icons/door.png'
import shiftIcon from '../../assets/icons/shift.png'
import engineIcon from '../../assets/svgIcons/engine.svg'
import trunkIcon from '../../assets/svgIcons/trunk.svg'
import { faLocationDot, faSuitcaseRolling } from '@fortawesome/free-solid-svg-icons'
export default function CarInfo({ carData, header }) {


    return (

        <div className="container-car-data car-info">
            <h3>{header}</h3>

            <div className="content">
                <div className='content-data'>

                    <p className='flex-text-icon'> <img className='icon' src={shiftIcon} alt="icon " /> <b>Prenos :&nbsp;</b><span> {carData.transmission}</span></p>
                    <hr className='info-divider' />

                    <p className='flex-text-icon'> <img className='icon' src={benzinIcon} alt="icon " /><b>Gorivo :&nbsp;</b><span>{carData.fuelType}</span></p>
                    <hr className='info-divider' />

                    <p className='flex-text-icon'> <img className='icon' src={groupIcon} alt="icon " /><b>Broj Putnika :&nbsp;</b><span>{carData.seats}</span></p>
                    <hr className='info-divider' />

                </div>

                <div className='content-data'>

                    <p className='flex-text-icon'> <img className='icon' src={engineIcon} alt="icon " /><b>Snaga :&nbsp;</b><span>{carData.enginePower || "80"}kWh</span></p>
                    <hr className='info-divider' />

                    <p className='flex-text-icon'><img className='icon' src={doorIcon} alt="icon " /><b>Broj Vrata :&nbsp;</b><span> {carData.doors}</span></p>
                    <hr className='info-divider' />

                    <p className='flex-text-icon'><img className='icon' src={trunkIcon} alt="icon " /><b>Prtljažni prostor :&nbsp;</b><span> {carData.trunkCapacity || 4} <FontAwesomeIcon color='#2D6A4F' icon={faSuitcaseRolling} /></span></p>
                    <hr className='info-divider' />

                </div>
            </div>


        </div>
    )
}