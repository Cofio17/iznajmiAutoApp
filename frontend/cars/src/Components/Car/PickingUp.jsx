import listIcon from '../../assets/icons/list.png'
export default function PickingUp({ header, carData }) {

    return (
        <div className="container-car-data picking-up">
            <h3>{header}</h3>

            <div className="content">

                <ul className='features-list'>
                    <div>
                        <p><img className='icon' src={listIcon} alt="icon " /><b></b></p>
                    </div>
                    {carData.features.map((feature, index) => {
                        return <li className='feature-item' key={index}>{feature}</li>
                    })}
                </ul>


                <ul className="features-list">

                    <li className='feature-item'><b>Parking senzor</b></li>
                    <li className='feature-item'><b>Parking Kamera</b> </li>
                    <li className='feature-item'><b>Povezanost</b> (AUX/USB/Bluetooth/CarPlay/Google Auto)</li>
                    <li className='feature-item'><b>Tempomat</b></li>
                    <li className='feature-item'><b>Lane assist</b></li>
                    <li className='feature-item'><b>Pogon</b> (Prednja/Zadnja vuča/4WD)</li>
                </ul>


            </div>
        </div>
    )
}