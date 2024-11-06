import { createContext, useContext, useReducer } from "react";
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import { resourceUrl } from './config';

const AuthContext = createContext();

const initialState = {
    user: null,
    isAuthenticated: false,
};

function reducer(state, action) {
    switch (action.type) {
        case "login":
            return { ...state, user: action.payload, isAuthenticated: true };
        case "logout":
            return { ...state, user: null, isAuthenticated: false };
        default:
            throw new Error("Unknown action");
    }
}

function AuthProvider({ children }) {
    const [{ user, isAuthenticated }, dispatch] = useReducer(reducer, initialState);

    async function login(token) {
        try {
            const decodedUser = jwtDecode(token);

            const response = await axios.post(
                `${resourceUrl}/participants`,
                { name: decodedUser.name }
            );

            if (response.status === 201) {
                const participantID = response.data.participantID;
                const userWithID = { ...decodedUser, participantID };
                dispatch({ type: "login", payload: userWithID });
            } else {
                console.error("Failed to get participantID from backend");
            }
        } catch (error) {
            console.error("Failed to login:", error);
        }
    }

    function logout() {
        dispatch({ type: "logout" });
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined)
        throw new Error("AuthContext was used outside AuthProvider");
    return context;
}

export { AuthProvider, useAuth };
