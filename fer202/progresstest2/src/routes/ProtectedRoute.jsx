import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({ children }) => {
    const { state } = useAuth();

    if (!state.user) {
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;