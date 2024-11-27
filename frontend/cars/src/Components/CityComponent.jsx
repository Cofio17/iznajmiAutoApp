import '../style.scss'
import { Link } from 'react-router-dom'
export default function CityComponent({ itemData }) {


    return (
        <Link to='/cars'>
            <div className="section-container-image">
                <div className="overlay"></div>
                <p className="text-overlay">{itemData.title}</p>
                <img src={itemData.description} alt="image" />


            </div>
        </Link>


    )
}