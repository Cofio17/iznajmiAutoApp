
import './CarCardNeww.scss'
import { Link } from "react-router-dom";
import gearShiftIcon from '../../assets/icons/shift.png'
import petrolIcon from '../../assets/icons/benzin.png'
import userIcon from '../../assets/icons/user.png'
import doorIcon from '../../assets/icons/door.png'
import electricIcon from '../../assets/icons/elektrican.png'

const CarCardNew = ({ carData }) => {
    return (
        <Link to={`car/${carData.licensePlate}`}>

            <div className="card_new">
                <div className="card-image-container_new">
                    <img src={carData.image} alt="Automobil" className="card-image_new" />
                    <div className="card-image-overlay_new"></div> {/* Overlay preko slike */}
                    <div className="card-price_new">{carData.pricePerDay}€/dan</div> {/* Cijena u donjem desnom kutu */}
                </div>
                <h2 className="card-title_new"> {carData.brand} {carData.model}</h2>
                <div className="card-specs_new">
                    <div className="spec-item_new transmission">
                        <img src={gearShiftIcon} alt="gear shift" className="spec-icon_new" />
                        <span>{carData.transmission}</span>
                    </div>
                    <div className="spec-item_new">
                        <img src={carData.fuelType === 'Petrol' ? petrolIcon : electricIcon} alt="fuel type icon" className="spec-icon_new" />

                    </div>
                    {/* <div className="spec-item_new">
                        <img src={carIcon} alt="car type icon" className="spec-icon_new" />
                        <span>{carData.type}</span>
                    </div> */}
                    <div className="spec-item_new">
                        <img src={userIcon} alt="seats icon" className="spec-icon_new" />
                        <span>{carData.seats}</span>
                    </div>
                    <div className="spec-item_new">
                        <img src={doorIcon} alt="door icon" className="spec-icon_new" />
                        <span>{carData.doors}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default CarCardNew;