import axios from "axios";
import React, { FC, PropsWithChildren, useContext, useEffect, useMemo, useState } from "react";
import { apiURL } from "../constants/apiURL";

type AuthContextType = {
    isAuthenticated: boolean;
    token: string | null;
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

    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        if (savedToken) {
          setToken(savedToken);
          setIsAuthenticated(true);
        }
      }, []);

    const login = async (email: string, password: string) => {
        try {
            const response = await axios.post(apiURL+"/login",  { email, password });
            const token = response.data.token;
            setToken(token);
            setIsAuthenticated(true);
            localStorage.setItem("token", token);
        } catch (error) {
            console.error("Login failed:", error);
            throw new Error("Login failed");
        }
    };

    const logout = async() =>  {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setToken(null)
    }

    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        if (savedToken) {
          setToken(savedToken);
          setIsAuthenticated(true);
        }
      }, []);

    const authContextValue = useMemo(
        () => ({
            isAuthenticated,
            token,
            login,
            logout
        }),  [isAuthenticated, token]
    );
    
    return (
        <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>
    )
}

export default AuthProvider;
  