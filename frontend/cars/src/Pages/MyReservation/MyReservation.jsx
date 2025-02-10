import { useState } from "react";
import { TextField } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import Layout from "../../Components/Layout/Layout";
import './myReservation.scss'


export default function MyReservation() {
    const [code, setCode] = useState("");
    const navigate = useNavigate();

    const handleSubmit = () => {
        if (code.trim()) {
            navigate(`/my-reservation/${code}`); // Navigacija na outlet rutu
        }
    };

    return (
        <Layout>
            <div className="find-reservation-container">
                <h1>Moja rezervacija</h1>
                <TextField
                    helperText="Unesite rezervacioni kod"
                    label="Rezervacioni kod"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()} // Enter navigacija
                />
                <button onClick={handleSubmit} className="button" variant="contained" sx={{ ml: 2 }}>
                    Pretraži
                </button>
            </div>


            <Outlet />


        </Layout>
    );
}
