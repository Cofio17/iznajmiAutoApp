import '../style.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
export default function SectionItem({ itemData }) {
    return (<div className="section-container-item">
        <div className="section-container-item-icon">
            <FontAwesomeIcon size='2x' icon={itemData.icon} />
        </div>
        <div className="section-container-item-text">
            <h2>{itemData.title}</h2>
            <p>{itemData.description}</p>
        </div>
    </div>

    )
}