import SectionItem from "./SectionItem"
import styles from './section.module.scss'
export default function SectionComponentWrapper({ sectionData }) {

    return (
        <div className={styles.sectionWrapper}>
            <div className="section-container-h1-p">
                <div className="gold-line"></div>
                <h2 className={styles.sectionTitle}>{sectionData.header}</h2>
                {sectionData.details && <p>{sectionData.details}</p>}
            </div>
            <section className={styles.sectionContainer}>

                <div className={styles.sectionContainerItems}>

                    {sectionData.steps.map((step) => (
                        <SectionItem key={step.id} itemData={step} />
                    ))}
                </div>
            </section>
        </div>
    )
}