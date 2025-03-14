import HeroHeader from "../HeroHeader/HeroHeader";
import Header from "../Header/Header";
import Footer from "../Footer";
import Modal from "../../utils/Modal/Modal";
import { AnimatePresence } from "framer-motion";
import LoginModal from "../../utils/Modal/ModalTypes/LoginModal";
import useModal from "../../Hooks/useModal";
import { HelmetProvider } from "react-helmet-async";


/**
 * @param {Object} props
 * @param {string} [props.header] - Optional header text (string)
 * @param {boolean} [props.appjsx] - Optional boolean for appjsx
 * @param {React.ReactNode} props.children - JSX elements as children
 * @returns {JSX.Element}
 */
export default function Layout({ header, children, appjsx }) {

    const { modalOpen, open, close } = useModal();

    return (
        <>
            <HelmetProvider>
                <Header onClick={open} />
                {header &&
                    <HeroHeader appjxs={appjsx} header={header} />
                }
                <main className={appjsx ? 'sidebar-cars-list' : undefined}>
                    <AnimatePresence initial={false} mode='wait'>
                        {modalOpen && <Modal type='login' modalOpen={modalOpen} handleClose={close} > <LoginModal handleClose={close} /></Modal>}
                    </AnimatePresence>
                    {children}
                </main>
                <Footer onClick={open} />
            </HelmetProvider>
        </>
    )
}