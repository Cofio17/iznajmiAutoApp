
import Button from '../Button/Button'
import styles from './section.module.scss'
export default function SectionButtons({ buttonData }) {

    return (

        <section className={styles.sectionContainerButton}>

            <div className="section-container-h1-p">
                <div className="gold-line"></div>
                <h2 className={styles.sectionTitle}>{buttonData.header}</h2>
                <Button id={buttonData.id} to={buttonData.to} text={buttonData.buttonText} />
            </div>

        </section>
    )

}