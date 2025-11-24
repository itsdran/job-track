import { useState, useContext, useEffect } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../pages/AuthContext.jsx";

import toast from "react-hot-toast";

export default function ProtectedRoute({ children }) {
    const { isAuthenticated } = useContext(AuthContext);
    const [isChecked, setIsChecked] = useState(false);

    useEffect (() => {
        if (!isAuthenticated) {
            toast.error("Log in first!");
        }
        setIsChecked(true);
    }, [isAuthenticated]);

    if (!isChecked) return null;
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
}
