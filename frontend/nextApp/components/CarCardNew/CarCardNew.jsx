import styles from './CarCardNew.module.scss'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSuitcaseRolling } from "@fortawesome/free-solid-svg-icons";

const mappedTrans = {
    "Manuel": "Manuelan"
};

const CarCardNew = ({ carData }) => {
    return (
        <Link passHref key={carData.licensePlate} href={`/rent-a-car/car/${carData.licensePlate}`}>
            <div className={styles.cardNew}>
                <div className={styles.cardImageContainerNew}>
                    <img src={carData.image} alt="Automobil" className={styles.cardImageNew} />
                    <div className={styles.cardImageOverlayNew}></div>
                    <div className={styles.cardPriceNew}>{carData.pricePerDay}€/dan</div>
                </div>
                <h2 className={styles.cardTitleNew}> {carData.brand} {carData.model}</h2>
                <div className={styles.cardSpecsNew}>
                    <div className={`${styles.specItemNew} ${styles.transmission}`}>
                        <img src={'/images/shift.png'} alt="gear shift" className={styles.specIconNew} />
                        <span>{mappedTrans[carData.transmission] || carData.transmission}</span>
                    </div>
                    <div className={styles.specItemNew}>
                        <img
                            src={carData.fuelType === 'Petrol' ? '/images/benzin.png' : '/images/elektrican.png'}
                            alt="fuel type icon"
                            className={styles.specIconNew}
                        />
                    </div>
                    <div className={styles.specItemNew}>
                        <img src={'/images/user.png'} alt="seats icon" className={styles.specIconNew} />
                        <span>{carData.seats}</span>
                    </div>
                    <div className={styles.specItemNew}>
                        <FontAwesomeIcon className="font-awsome-icon" color="#2D6A4F" icon={faSuitcaseRolling} />
                        <span>{carData.trunkCapacity || '1'}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default CarCardNew;