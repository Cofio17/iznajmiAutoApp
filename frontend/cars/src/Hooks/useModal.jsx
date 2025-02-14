import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function useModal() {
    const [modalOpen, setModalOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const [modalType, setModalType] = useState(null);

    useEffect(() => {

    }, [location.pathname])

    const close = () => {
        document.body.classList.remove("no-scroll");
        setModalOpen(false);
        if (location.pathname === '/reservation') {
            navigate('/', { replace: true });
        }

    }
    const open = () => {
        document.body.classList.add("no-scroll");
        setModalOpen(true);
    }


    /**
     *Opens a modal of the given type.
     * @param {string} type - Modal type that needs to be opened (e.g. "cancel-reservation" ili "calendar-modal").
     */
    const openModals = (type) => {
        open();
        setModalType(type);
    }

    return { modalOpen, open, close, openModals, modalType };
}
