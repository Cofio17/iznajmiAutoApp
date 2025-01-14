import { motion } from 'framer-motion'
import BackDrop from '../BackDrop/Backdrop'
import './modal.scss'
export default function Modal({ handleClose, text }) {

    const dropIn = {
        hidden: {
            y: "-100vh",
            opacity: 0
        },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.1,
                type: 'spring',
                damping: 25,
                stiffness: 500
            }
        },
        exit: {
            y: "100vh"
        }

    }
    return (
        <BackDrop>

            <motion.div initial='hidden' animate='visible' exit='exit' variants={dropIn} className='modal' onClick={(e) => e.stopPropagation()}>

                <div className="heading">
                    <h2>Čestitamo!</h2>
                    <p>Vaša rezervacija je uspešno završena!</p>
                </div>
                <div className="main-content">
                    <p>
                        Detalji vaše rezervacije su poslati na vašu email adresu.
                        Hvala što ste odabrali našu uslugu. Želimo vam srećnu vožnju!
                    </p>
                    <p>Ako imate dodatna pitanja, slobodno nas kontaktirajte.</p>
                </div>
                <button className='button' onClick={handleClose}>U redu</button>


            </motion.div>
        </BackDrop>
    )
}