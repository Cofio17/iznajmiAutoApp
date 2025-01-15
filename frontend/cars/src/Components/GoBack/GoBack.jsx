import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
export default function GoBack() {
    const navigate = useNavigate();


    const prevPage = () => {
        navigate(-1)
    }

    return (
        <div style={{ cursor: 'pointer' }} className="go-back-container">
            <span style={{ color: '#444' }} onClick={prevPage}>
                <FontAwesomeIcon icon={faChevronLeft} />Povratak
            </span>
        </div>
    )
}