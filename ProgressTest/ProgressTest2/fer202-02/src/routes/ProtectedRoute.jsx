import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function ProtectedRoute({ children }) {

    const { state } = useContext(AuthContext);

    if (!state.isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return children;

}