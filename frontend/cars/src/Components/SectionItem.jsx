import '../style.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion } from 'framer-motion'
export default function SectionItem({ itemData }) {
    return (
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }} className="section-container-item">
            <div className="section-container-item-icon">
                <FontAwesomeIcon size='2x' icon={itemData.icon} />
            </div>
            <div className="section-container-item-text">
                <h2>{itemData.title}</h2>
                <p>{itemData.description}</p>
            </div>
        </motion.div>

    )
}