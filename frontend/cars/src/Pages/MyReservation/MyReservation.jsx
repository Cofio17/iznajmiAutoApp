import { useState } from "react";
import { TextField } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import Layout from "../../Components/Layout/Layout";
import './myReservation.scss'
import { motion } from 'framer-motion'


export default function MyReservation() {
    const [code, setCode] = useState("");
    const navigate = useNavigate();

    const handleSubmit = () => {
        if (code.trim()) {
            navigate(`/moja-rezervacija/${code}`);
        }
    };

    return (
        <Layout>
            <div className="find-reservation-container">
                <h1>Moja rezervacija</h1>
                <div className="search-bar-button">
                    <TextField
                        className="mui-input"
                        helperText="Unesite rezervacioni kod"
                        label="Rezervacioni kod"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                    />
                    <motion.button whileTap={{ scale: 1.1 }}
                        whileHover={{
                            scale: 0.95,
                            transition: { duration: 0.05 },
                        }} onClick={handleSubmit} className="button" variant="contained" sx={{ ml: 2 }}>
                        Pretraži
                    </motion.button>
                </div>
                <Outlet />
            </div>
        </Layout>
    );
}
