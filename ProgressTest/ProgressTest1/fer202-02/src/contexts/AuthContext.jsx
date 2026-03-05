import React, { createContext, useReducer, useEffect } from "react";

// ===============================
// 1️⃣ Lấy user từ localStorage nếu có
// ===============================
const storedUser = JSON.parse(localStorage.getItem("user"));

// ===============================
// 2️⃣ Initial State
// ===============================
const initialState = {
  isAuthenticated: storedUser ? true : false,
  user: storedUser || null,
  loading: false,
  error: null,
};

// ===============================
// 3️⃣ Reducer
// ===============================
const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        ...state,
        loading: true,
        error: null,
      };

    case "LOGIN_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false,
        error: null,
      };

    case "LOGIN_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };

    default:
      return state;
  }
};

// ===============================
// 4️⃣ Create Context
// ===============================
export const AuthContext = createContext();

// ===============================
// 5️⃣ Provider
// ===============================
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // ===============================
  // 6️⃣ Tự động lưu user vào localStorage khi thay đổi
  // ===============================
  useEffect(() => {
    if (state.user) {
      localStorage.setItem("user", JSON.stringify(state.user));
    } else {
      localStorage.removeItem("user");
    }
  }, [state.user]);

  // ===============================
  // 7️⃣ Hàm Login
  // ===============================
  const login = (userData) => {
    dispatch({ type: "LOGIN_START" });

    try {
      dispatch({ type: "LOGIN_SUCCESS", payload: userData });
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error.message });
    }
  };

  // ===============================
  // 8️⃣ Hàm Logout
  // ===============================
  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        dispatch,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};