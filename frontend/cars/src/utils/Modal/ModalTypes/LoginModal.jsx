import { TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import logo from '../../../assets/images/logo.png'
import { useState, useContext } from "react";
import { useAuth } from "../../../Hooks/useAuth";
import { AuthContext } from "../../../Contexts/AuthContextHelper";

export default function LoginModal({ handleClose }) {
    // <TextField error={error} fullWidth id="firstname" required={true} variant="outlined" type="text" value={firstName} label={'Ime'} onChange={(e) => setFirstName(e.target.value)} className="mui-input reservation-form-input" />

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const { login } = useContext(AuthContext);

    const handlePassVisibilty = () => {
        setShowPassword(!showPassword)
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); // Sprečava podrazumevano ponašanje forme
        setLoading(true); // Postavi loading na true
        try {
            await login(email, password); // Koristite await da čekate da se login završi
            handleClose(); // Zatvori modal nakon uspešne prijave
        } catch (error) {
            console.error("Login failed:", error); // Rukovanje greškama
            // Možeš dodati obaveštenje korisniku ovde
        } finally {
            setLoading(false); // Uvek resetuj loading stanje
        }
    };
    return (
        <div className="login-form">
            <img src={logo} alt="logo" />
            <form onSubmit={handleSubmit}>


                <div className="inputs">
                    <TextField autoComplete="on" value={email} onChange={(e) => { setEmail(e.target.value) }} className="mui-input" fullWidth id="username" type="email" variant="outlined" label={'Korisničko ime'} />

                    <div className="div-pass" >
                        <TextField autoComplete="on" value={password} onChange={(e) => { setPassword(e.target.value) }} className="mui-input" fullWidth id="password" type={showPassword ? 'text' : 'password'} variant="outlined" label={'Šifra'} />
                        <FontAwesomeIcon onClick={handlePassVisibilty} color="#6b6b6b" icon={showPassword ? faEyeSlash : faEye} />
                    </div>

                </div>

                <div className="buttons">
                    <span onClick={handleClose} className="close-text">Izlaz</span>
                    <div className="login-container">
                        <button type="submit" className="button login-button">Login</button>
                    </div>

                </div>
            </form>
        </div>

    )

}