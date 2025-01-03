
import { useAuth } from "./FakeAuthContext";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }
    return children;
}

export default ProtectedRoute;
