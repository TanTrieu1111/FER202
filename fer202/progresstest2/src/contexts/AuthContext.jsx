import { createContext, useReducer, useContext } from "react";

const INITIAL_STATE = {
    user: null,
    loading: false,
    error: null
};

export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START":
            return {
                user: null,
                loading: true,
                error: null
            };

        case "LOGIN_SUCCESS":
            return {
                user: action.payload.user,
                loading: false,
                error: null
            };

        case "LOGIN_FAILURE":
            return {
                user: null,
                loading: false,
                error: action.payload.error
            };

        case "LOGOUT":
            return {
                user: null,
                loading: false,
                error: null
            };

        default:
            return state;
    }
};

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    return (
        <AuthContext.Provider
            value={{
                state,
                dispatch
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// custom hook để dùng trong component
export const useAuth = () => {
    return useContext(AuthContext);
};