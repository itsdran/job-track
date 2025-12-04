import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [firstName, setFirstName] = useState("");

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const storedFirstName = localStorage.getItem("first_name");

        if (storedToken && storedUser && storedFirstName) {
            setToken(storedToken);
            setUser(storedUser);
            setFirstName(storedFirstName);
        }
    }, []);

    useEffect(() => {
    }, [token]);

    const login = (user, token) => {
        setUser(user);
        setToken(token);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!token, firstName }}>
            {children}
        </AuthContext.Provider>
    );
};
