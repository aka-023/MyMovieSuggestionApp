import { createContext, useState } from "react";

export const AuthContext = createContext({
    isAuthenticated: false,
    setIsAuthenticated: () => {}
});

const AuthProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
    <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated}}>
        {children}
    </AuthContext.Provider>
    )
}

export default AuthProvider;
