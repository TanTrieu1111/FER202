import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import expensesReducer from "./slices/expensesSlice";
const store = configureStore({
    reducer: {
        auth: authReducer,
        expenses: expensesReducer  // state.auth chứa auth state
        // Sau này thêm:
        // expenses: expensesReducer,
    },
    // Tự động bao gồm:
    // - redux-thunk middleware (cho async)
    // - Redux DevTools
    // - Kiểm tra lỗi mutation + serializable
});

export default store;
