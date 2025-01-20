import { useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode'
import axios from "axios";
// import { AuthContext } from "../Hooks/useAuth";
import { AuthContext } from "./AuthContextHelper";
import Cookies from 'js-cookie'


const AuthProvider = ({ children }) => {
    const localhost = import.meta.env.VITE_LOCAL_HOST;
    const [token, setToken] = useState("");
    const [user, setUser] = useState({});

    const login = async (email, password) => {
        try {
            const res = await axios.post(`${localhost}login`,
                { email, password },
                {
                    withCredentials: true,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
            if (res.status === 200) {
                console.log(res);
                setUser(res.data.userData);
                setToken(res.data.accessToken);
                localStorage.setItem('token', res.data.accessToken);
                localStorage.setItem('user', JSON.stringify(res.data.userData._id));
                ;


            }
        } catch (error) {
            console.error(`error while logging in: ${error}`);
        }
    };

    const logout = async () => {
        try {
            const res = await axios.post(`${localhost}logout`, {}, {
                withCredentials: true,
                headers: { 'Content-Type': 'application/json' }
            })
            console.log(res);

            if (res.status === 200) {
                console.log(res);
                setUser({});
                setToken("");
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            }
        } catch (error) {
            console.error(`error while logging out: ${error}`);
        }


    }

    const isTokenValid = (token) => {

        try {
            const { exp } = jwtDecode(token);
            const currentTime = Math.floor(Date.now() / 1000);
            return exp > currentTime;
        } catch (error) {
            return false;
        }
    }

    return (
        <AuthContext.Provider value={{ login, logout, token, user, isTokenValid }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider };
