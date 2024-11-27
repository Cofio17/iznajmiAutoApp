import '../style.scss'
export default function SectionItem({ itemData }) {
    return (<div className="section-container-item">
        <div className="section-container-item-icon">
            <img src="" alt="icon" />
        </div>
        <div className="section-container-item-text">
            <h2>{itemData.title}</h2>
            <p>{itemData.description}</p>
        </div>
    </div>

    )
}