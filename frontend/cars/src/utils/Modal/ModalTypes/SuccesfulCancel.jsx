import { useNavigate } from "react-router-dom"
import { Button } from "@mui/material";

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
                    <Button id="second-thought-button" variant="contained" onClick={() => { navigate('/') }}>
                        Povratak na početnu stranicu
                    </Button>
                </div>
            </div>
        </>
    )
}