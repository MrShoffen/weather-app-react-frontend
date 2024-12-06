import React from "react";
import { Route, Navigate } from "react-router-dom"; // Если используете react-router-dom v6
import { useAuth } from "./AuthContext.jsx";

const ProtectedRoute = ({ element: Component, ...rest }) => {
    const { auth } = useAuth();

    return (
        <Route
            {...rest}
            element={
                auth.isAuthenticated ? (
                    Component
                ) : (
                    <Navigate to="/login" replace={true} />
                )
            }
        />
    );
};

export default ProtectedRoute;