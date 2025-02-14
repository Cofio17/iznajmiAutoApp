import { useNavigate } from "react-router-dom"
import { Button } from "@mui/material";
import MotionButton from "../../../Components/MotionButton/MotionButton";

export default function SuccesfulCancel() {

    const navigate = useNavigate();

    return (
        <>
            <div className="heading">
                <h2>Uspešno Otkazivanje rezervacije</h2>
                {/* <h3> {personData.brand}  {personData.model}</h3> */}
            </div>
            <div className="main-content">
                <div className="buttons">

                    <MotionButton text={" Povratak na početnu stranicu"} id={"second-thought-button"} onClick={() => { navigate('/'); window.location.reload() }} />
                </div>
            </div>
        </>
    )
}