import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContextHelper";

export default function ProtectedRoute({ children }) {
    const { token, isTokenValid } = useContext(AuthContext);

    // Provera tokena iz AuthContext i localStorage
    const savedToken = localStorage.getItem('token')
    const isAuthenticated = isTokenValid(savedToken);

    if (!isAuthenticated) {
        return <Navigate to='/' replace />;
    }

    return children;
}