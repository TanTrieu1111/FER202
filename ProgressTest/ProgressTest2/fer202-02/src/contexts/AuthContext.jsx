import { createContext, useReducer } from "react";

const initialState = {
    user: null,
    isAuthenticated: false
};

export const AuthContext = createContext();

function reducer(state, action) {

    switch (action.type) {

        case "LOGIN":
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true
            };

        case "LOGOUT":
            return {
                user: null,
                isAuthenticated: false
            };

        default:
            return state;
    }

}

export function AuthProvider({ children }) {

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );

}