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
                        return <li className='feature-item' key={index}><b>{feature}</b></li>
                    })}
                </ul>
            </div>
        </div>
    )
}