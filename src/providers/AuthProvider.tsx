import axios from "axios";
import React, { FC, PropsWithChildren, useContext, useEffect, useMemo, useState } from "react";
import { apiURL } from "../constants/apiURL";

type AuthContextType = {
    isAuthenticated: boolean;
    token: string | null;
    role: string | null;
    isBusinessAccount: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
  }
  
const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
    const context =  useContext(AuthContext);
    if (!context) throw new Error("useAuth  must be used within an AuthProvider");
    return context;
}

const AuthProvider: FC<PropsWithChildren> =  ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [token, setToken]  = useState(localStorage.getItem("token"));
    const [role, setRole] = useState(localStorage.getItem("r"));
    const [isBusinessAccount, setIsBusinessAccount] = useState<boolean>(false);

    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        const savedRole = localStorage.getItem("r");
        if (savedToken && savedRole) {
          setToken(savedToken);
          setRole(savedRole);
          setIsAuthenticated(true);
          setIsBusinessAccount(role == "2");
        }
      }, []);

    const login = async (email: string, password: string) => {
        try {
            const response = await axios.post(apiURL+"/login",  { email, password });
            const token = response.data.token;
            const role = response.data.role;
            setToken(token);
            setRole(role);
            setIsAuthenticated(true);
            setIsBusinessAccount(role == "2");
            localStorage.setItem("token", token);
            localStorage.setItem("r", role);
        } catch (error) {
            console.error("Login failed:", error);
            throw new Error("Login failed");
        }
    };

    const logout = async() =>  {
        localStorage.removeItem('token');
        localStorage.removeItem('r');
        setIsAuthenticated(false);
        setIsBusinessAccount(false);
        setToken(null)
        setRole(null);
    }

    const authContextValue = useMemo(
        () => ({
            isAuthenticated,
            isBusinessAccount,
            token,
            role,
            login,
            logout
        }),  [isAuthenticated, token, role]
    );
    
    return (
        <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>
    )
}

export default AuthProvider;
  