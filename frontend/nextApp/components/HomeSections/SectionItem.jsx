import styles from './section.module.scss'
import Image from 'next/image'

export default function SectionItem({ itemData }) {
    return (
        <div className={styles.sectionContainerItem}>
            {itemData.icon && <div className={styles.sectionContainerItemIcon}>
                <Image unoptimized width={50} height={50} src={`/${itemData.icon}`} alt={`${itemData.icon}-icon`} />
            </div>}

            <div className={styles.sectionContainerItemText}>
                <h2>{itemData.title}</h2>
                <p className={styles.sectionContainerItemTextP}>{itemData.description}</p>
            </div>
        </div>

    )
}