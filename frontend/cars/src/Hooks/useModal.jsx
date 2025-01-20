import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function useModal() {
    const [modalOpen, setModalOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

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

    return { modalOpen, open, close };
}
