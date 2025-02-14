import { useNavigate } from "react-router-dom"
import MotionButton from "../../../Components/MotionButton/MotionButton"

export default function SuccesfulChangeModal({ reservationId }) {

    const navigate = useNavigate();
    return (
        <>
            <div className="heading">
                <h2>Uspešno Pomeranje rezervacije </h2>
                {/* <h3> {personData.brand}  {personData.model}</h3> */}
            </div>
            <div className="main-content">
                <div className="buttons">
                    <MotionButton text={'Vidi rezervaciju!'} onClick={() => {
                        navigate(`/moja-rezervacija/${reservationId}`);
                        window.location.reload(); // Osvežava stranicu
                    }} />
                </div>
            </div>
        </>
    )
}